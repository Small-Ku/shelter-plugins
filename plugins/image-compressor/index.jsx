import { CompressionModal } from "./components/CompressionModal";
import { Settings } from "./components/Settings";
import { initWorker } from "./lib/codec";
import { DEFAULTS, Strategy, Workflow, processedFiles } from "./lib/constants";
import { t } from "./lib/i18n";
import { compressImage, getLimit } from "./lib/util";

const {
    flux: { dispatcher, intercept },
    patcher,
    plugin: { store },
    solid: { createEffect, createSignal, untrack },
    ui: { ToastColors, openModal, showToast },
    util: { log },
} = shelter;

// Initialize defaults
for (const key in DEFAULTS) {
    store[key] ??= DEFAULTS[key];
}

const unintercept = intercept((action) => {
    if (action.type === "UPLOAD_ATTACHMENT_ADD_FILES") {
        const { files, channelId, draftType } = action;
        const limit = getLimit();
        const strategy = store.strategy || DEFAULTS.strategy;
        const workflow = store.workflow || DEFAULTS.workflow;

        if (strategy === Strategy.NONE) return;

        const targetBytes = (store.targetSize || DEFAULTS.targetSize) * 1024 * 1024;
        const filesToProcess = files.filter(f => {
            const actualFile = f.file || f;
            const isImage = actualFile.type?.startsWith("image/");
            const isProcessed = processedFiles.has(actualFile);
            if (!isImage || isProcessed) return false;

            if (strategy === Strategy.AUTO) {
                return actualFile.size > targetBytes || actualFile.size > limit;
            }
            return strategy === Strategy.ONCE;
        });

        if (filesToProcess.length > 0) {
            log(`Intercepted image upload for channel ${channelId}`);

            const [finished, setFinished] = createSignal(0);
            const [started, setStarted] = createSignal(true); // Auto-start compression

            const [localQuality, setLocalQuality] = createSignal(store.quality || DEFAULTS.quality);
            const [localMaxDim, setLocalMaxDim] = createSignal(store.maxDimension || DEFAULTS.maxDimension);
            const [localTarget, setLocalTarget] = createSignal(store.targetSize || DEFAULTS.targetSize);
            const [localAccuracy, setLocalAccuracy] = createSignal(store.accuracy || DEFAULTS.accuracy);
            const [localFormat, setLocalFormat] = createSignal(store.format || DEFAULTS.format);
            const [localEngine, setLocalEngine] = createSignal(store.engine || DEFAULTS.engine);
            const [localUseOxipng, setLocalUseOxipng] = createSignal(true);

            const currentEngine = store.engine || DEFAULTS.engine;

            const initialQueue = files.map(f => {
                const actualFile = f.file || f;
                const isImage = actualFile.type?.startsWith("image/");
                const isProcessed = processedFiles.has(actualFile);
                let needsProcessing = isImage && !isProcessed;
                if (needsProcessing && strategy === Strategy.AUTO) {
                    needsProcessing = actualFile.size > targetBytes || actualFile.size > limit;
                }
                return {
                    name: actualFile.name,
                    file: actualFile,
                    isWrapped: !!f.file,
                    original: f,
                    needsProcessing,
                    status: needsProcessing ? 'pending' : 'skipped',
                    previewUrl: needsProcessing ? URL.createObjectURL(actualFile) : null,
                    compressedFile: null,
                    compressedUrl: null,
                    autoFile: null,
                    autoUrl: null,
                    currentPass: 0,
                    currentQuality: 0,
                    passMetadata: null
                };
            });

            const [queue, setQueue] = createSignal(initialQueue);
            const totalToProcess = initialQueue.filter(i => i.needsProcessing).length;
            let isCancelled = false;

            const closeModal = openModal((props) => (
                <CompressionModal
                    {...props}
                    started={started} setStarted={setStarted}
                    finished={finished} total={totalToProcess}
                    queue={queue}
                    localMaxDim={localMaxDim} setLocalMaxDim={setLocalMaxDim}
                    localQuality={localQuality} setLocalQuality={setLocalQuality}
                    localTarget={localTarget} setLocalTarget={setLocalTarget}
                    localAccuracy={localAccuracy} setLocalAccuracy={setLocalAccuracy}
                    localFormat={localFormat} setLocalFormat={setLocalFormat}
                    localEngine={localEngine} setLocalEngine={setLocalEngine}
                    localUseOxipng={localUseOxipng} setLocalUseOxipng={setLocalUseOxipng}
                    onCancel={() => { isCancelled = true; props.close(); }}
                    onConfirm={() => {
                        const results = queue().map(item => {
                            if (item.needsProcessing && item.compressedFile) {
                                return item.isWrapped ? { ...item.original, file: item.compressedFile } : item.compressedFile;
                            }
                            return item.original;
                        });

                        finishUpload(results);
                        props.close();
                    }}
                    onRestoreAuto={(idx) => {
                        if (idx === null) return;
                        setQueue(q => {
                            const newQ = [...q];
                            const item = newQ[idx];
                            if (item.autoFile) {
                                // If we have an auto result, restore it
                                // First revoke the manual one if it exists
                                if (item.compressedUrl && item.compressedUrl !== item.autoUrl && item.compressedUrl !== item.previewUrl) {
                                    URL.revokeObjectURL(item.compressedUrl);
                                }
                                newQ[idx] = {
                                    ...item,
                                    compressedFile: item.autoFile,
                                    compressedUrl: item.autoUrl,
                                    // Keep autoFile/autoUrl in case they want to manual compress again
                                    status: 'done',
                                    passMetadata: null
                                };
                            }
                            return newQ;
                        });
                    }}
                    onRecompress={async (idx, settings) => {
                        if (idx === null) return;

                        const currentItem = queue()[idx];
                        if (!currentItem || !currentItem.file) return;

                        // Preserve the auto-compressed result if this is the first manual re-compression
                        setQueue(q => {
                            const newQ = [...q];
                            const item = newQ[idx];
                            const updates = { status: 'compressing' };

                            if (!item.autoFile && item.compressedFile) {
                                updates.autoFile = item.compressedFile;
                                updates.autoUrl = item.compressedUrl;
                            }

                            newQ[idx] = { ...item, ...updates };
                            return newQ;
                        });

                        try {
                            const compressed = await compressImage(currentItem.file, {
                                quality: settings.quality,
                                maxDimension: settings.maxDim,
                                strategy: Strategy.ONCE,
                                format: settings.format,
                                engine: settings.engine,
                                useOxipng: settings.useOxipng,
                                onPass: (pass, quality, intermediateFile, points) => {
                                    setQueue(q => {
                                        const newQ = [...q];
                                        const item = { ...newQ[idx] };

                                        if (intermediateFile) {
                                            if (item.compressedUrl && item.compressedUrl !== item.autoUrl && item.compressedUrl !== item.previewUrl) {
                                                URL.revokeObjectURL(item.compressedUrl);
                                            }
                                            item.compressedUrl = URL.createObjectURL(intermediateFile);
                                            item.compressedFile = intermediateFile;
                                        }

                                        item.currentPass = pass;
                                        item.currentQuality = quality;

                                        // Merge points
                                        const existing = item.points || [];
                                        const merged = [...existing, ...(points || [])];
                                        // Deduplicate and sort
                                        item.points = Array.from(new Map(merged.map(p => [p.q, p])).values())
                                            .sort((a, b) => a.q - b.q);

                                        item.passMetadata = { pass, quality, size: intermediateFile?.size || 0, points: item.points };

                                        newQ[idx] = item;
                                        return newQ;
                                    });
                                }
                            });

                            processedFiles.add(compressed);
                            const compUrl = URL.createObjectURL(compressed);

                            setQueue(q => {
                                const newQ = [...q];
                                const item = newQ[idx];

                                if (item.compressedUrl && item.compressedUrl !== compUrl && item.compressedUrl !== item.autoUrl && item.compressedUrl !== item.previewUrl) {
                                    URL.revokeObjectURL(item.compressedUrl);
                                }

                                newQ[idx] = {
                                    ...item,
                                    status: 'done',
                                    compressedFile: compressed,
                                    compressedUrl: compUrl,
                                    passMetadata: null
                                };
                                return newQ;
                            });
                        } catch (err) {
                            log(`Manual compression failed: ${err}`);
                            setQueue(q => {
                                const newQ = [...q];
                                newQ[idx] = { ...newQ[idx], status: 'done' };
                                return newQ;
                            });
                        }
                    }}
                />
            ));

            const finishUpload = (results) => {
                queue().forEach(item => {
                    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
                    if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
                    if (item.autoUrl) URL.revokeObjectURL(item.autoUrl);
                });

                dispatcher.dispatch({
                    type: "UPLOAD_ATTACHMENT_ADD_FILES",
                    channelId,
                    draftType,
                    files: results,
                });
            };

            let isRunning = false;
            const runCompression = async () => {
                if (isRunning) return;
                isRunning = true;
                try {
                    for (const [idx, item] of initialQueue.entries()) {
                        if (isCancelled) break;
                        if (!item.needsProcessing) continue;

                        setQueue(q => {
                            const newQ = [...q];
                            newQ[idx].status = 'compressing';
                            return newQ;
                        });

                        const compressed = await compressImage(item.file, {
                            quality: localQuality(),
                            maxDimension: localMaxDim(),
                            targetMB: localTarget(),
                            accuracy: localAccuracy(),
                            strategy: strategy,
                            format: localFormat(),
                            engine: currentEngine,
                            onPass: (pass, quality, intermediateFile, points) => {
                                setQueue(q => {
                                    const newQ = [...q];
                                    const item = { ...newQ[idx] };

                                    item.currentPass = pass;
                                    item.currentQuality = quality;

                                    if (intermediateFile) {
                                        if (item.compressedUrl && item.compressedUrl !== item.previewUrl) {
                                            URL.revokeObjectURL(item.compressedUrl);
                                        }
                                        item.compressedFile = intermediateFile;
                                        item.compressedUrl = URL.createObjectURL(intermediateFile);
                                    }

                                    // Merge points
                                    const existing = item.points || [];
                                    const merged = [...existing, ...(points || [])];
                                    item.points = Array.from(new Map(merged.map(p => [p.q, p])).values())
                                        .sort((a, b) => a.q - b.q);

                                    item.passMetadata = {
                                        pass,
                                        quality,
                                        size: intermediateFile?.size || 0,
                                        points: item.points
                                    };

                                    newQ[idx] = item;
                                    return newQ;
                                });
                            }
                        });

                        if (isCancelled) break;

                        processedFiles.add(compressed);

                        // If we didn't update onPass (single pass), or for final result
                        const compUrl = URL.createObjectURL(compressed);

                        setFinished(v => v + 1);
                        setQueue(q => {
                            const newQ = [...q];
                            newQ[idx] = { ...newQ[idx] };

                            newQ[idx].status = 'done';
                            if (newQ[idx].compressedUrl && newQ[idx].compressedUrl !== compUrl) {
                                URL.revokeObjectURL(newQ[idx].compressedUrl);
                            }
                            newQ[idx].compressedFile = compressed;
                            newQ[idx].compressedUrl = compUrl;
                            newQ[idx].passMetadata = null; // Clear live metadata as we are "done"
                            log(`Final: Set compressedUrl for ${item.name}, size ${compressed.size}`);
                            return newQ;
                        });
                    }

                    if (isCancelled) return;

                    if (workflow === Workflow.DIRECT) {
                        const results = queue().map(item => {
                            if (item.needsProcessing && item.compressedFile) {
                                return item.isWrapped ? { ...item.original, file: item.compressedFile } : item.compressedFile;
                            }
                            return item.original;
                        });

                        finishUpload(results);
                        closeModal();

                        showToast({
                            title: t("plugin_name"),
                            content: t("toast_processed", { count: totalToProcess }),
                            color: ToastColors.SUCCESS,
                            duration: 2000,
                        });
                    }
                } catch (e) {
                    log(`Processing error: ${e}`, "error");
                    showToast({
                        title: t("plugin_name"),
                        content: t("toast_error"),
                        color: ToastColors.RED,
                    });
                }
            };

            createEffect(() => {
                if (started()) {
                    untrack(() => runCompression());
                }
            });

            return false;
        }
    }
});

const unpatches = [];
async function patchStores() {
    const UserStore = await shelter.flux.awaitStore("UserStore");
    if (UserStore?.getCurrentUser) {
        unpatches.push(patcher.after("getCurrentUser", UserStore, (_, user) => {
            if (user && user.premiumType !== 2) user.premiumType = 2;
            return user;
        }));
    }
}

export function onLoad() {
    log("Image Compressor loaded");
    initWorker();
    patchStores();
}

export function onUnload() {
    unintercept();
    for (const u of unpatches) u();
}

export const settings = Settings;
