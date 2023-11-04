import RegisteredGames from './components/RegisteredGames'
import { generateAssetUrl } from './util'

const {
  flux: {
    dispatcher: FluxDispatcher,
    stores: {
      GameStore
    }
  },
  settings: {
    registerSection
  },
  ui: {
    showToast
  }
} = shelter

let maybeUnregisterGameSetting = () => {}
let storeExtraData = false

let ws: WebSocket
const apps: Record<string, { name: string } | string> = {}

async function lookupApp(applicationId: string): Promise<string> {
  return GameStore.getGame(applicationId)?.name || 'Unknown'
}

async function handleMessage(e: MessageEvent<string>) {
  const data = JSON.parse(e.data)
  const assets = data.activity?.assets

  if (assets?.large_image) assets.large_image = generateAssetUrl(data.activity.application_id, assets.large_image)
  if (assets?.small_image) assets.small_image = generateAssetUrl(data.activity.application_id, assets.small_image)

  if (data.activity) {
    const appId = data.activity.application_id
    apps[appId] ||= await lookupApp(appId)
    
    const app = apps[appId]
    if (typeof app !== 'string') {
      data.activity.name ||= app.name
    }
  }

  FluxDispatcher.dispatch({
    type: 'LOCAL_ACTIVITY_UPDATE',
    ...data
  })
}

export const onLoad = async () => {
  if (ws) ws.close()

  ws = new WebSocket('ws://127.0.0.1:1337')
  ws.onmessage = handleMessage

  // See if we were able to connect after a second
  const connected = await new Promise(r => setTimeout(() => {
    if (ws.readyState !== WebSocket.OPEN) {
      ws.close()
      ws = null

      showToast({
        title: 'ShelteRPC',
        content: 'Unable to connect to ShelteRPC server',
        duration: 3000
      })

      r(false)
    }

    r(true)
  }, 1000))

  if (!connected) return

  ws.onclose = () => {
    showToast({
      title: 'ShelteRPC',
      content: 'ShelteRPC server disconnected',
      duration: 3000
    })
  }

  showToast({
    title: 'ShelteRPC',
    content: 'Connected to ShelteRPC server',
    duration: 3000
  })

  // If we are running in Dorion, register the game settings section
  if ((await (window as any)?.__TAURI__.app.getName()) === 'Dorion') {
    console.log('[ShelteRPC] We are on Dorion, enabling extra features')
    storeExtraData = true
    maybeUnregisterGameSetting = registerSection('section', 'shelterpc', 'Registered Games', RegisteredGames)
  }
}

export const onUnload = async () => {
  ws.close()
  
  if (maybeUnregisterGameSetting) maybeUnregisterGameSetting()
}