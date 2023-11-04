interface DorionSettings {
  zoom: number | string
  client_type: string
  sys_tray: boolean
  push_to_talk: boolean
  push_to_talk_keys: string[]
  theme: string
  use_native_titlebar: boolean
  start_maximized: boolean
  open_on_startup: boolean
  startup_minimized: boolean
  autoupdate: boolean
  update_notify: boolean
  desktop_notifications: boolean
  auto_clear_cache: boolean
  multi_instance: boolean
}

interface DorionTheme {
  label: string
  value: string
}

interface DorionPlugin {
  name: string
  preload: boolean
  disabled: boolean
}

interface ShelteRPCPreviouslyPlayed {
  name: string
  lastPlayed: number
}

interface ShelteRPCStore {
  currentlyPlaying: string
  previouslyPlayed: 
}