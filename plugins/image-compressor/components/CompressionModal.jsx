import { ComparisonView } from "./ComparisonView";
import { CompressionQueue } from "./CompressionQueue";
import { ManualCompressionControls } from "./ManualCompressionControls";
import { t } from "../lib/i18n";

const {
    ui: {
        Text,
        TextTags,
        ModalRoot,
        ModalHeader,
        ModalFooter,
        ModalBody,
        ModalSizes,
        Header,
        HeaderTags,
        Button,
        ButtonColors,
        ButtonSizes
    },
    solid: { Show, createSignal, createMemo },
} = shelter;

export const CompressionModal = (props) => {
    const {
        started,
        finished, total,
        queue,
        localMaxDim, setLocalMaxDim,
        localQuality, setLocalQuality,
        localFormat, setLocalFormat,
        onCancel,
        onConfirm,
        onRestoreAuto,
        onRecompress
    } = props;

    const [inspectedIndex, setInspectedIndex] = createSignal(null);
    const [referenceType, setReferenceType] = createSignal("original"); // "original" or "auto"

    // Default to currently processing or the last one finished if nothing selected
    const inspectedItem = createMemo(() => {
        const q = queue();
        const idx = inspectedIndex();
        if (idx !== null) return q[idx];

        if (!started()) return null;

        const compressing = q.find(item => item.status === 'compressing');
        if (compressing) return compressing;

        // If finished, show the last one that was processed
        if (finished() === total) {
            return [...q].reverse().find(item => item.status === 'done');
        }

        return null;
    });

    const bodyStyle = {
        padding: "24px",
        overflow: "hidden",
        display: "flex",
        "flex-direction": "column",
        height: "100%",
        gap: "16px"
    };

    const glassContainerStyle = {
        background: "rgba(32, 34, 37, 0.9)",
        "backdrop-filter": "blur(24px)",
        "border-radius": "16px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
        display: "flex",
        "flex-direction": "column",
        "max-height": "85vh",
        "min-height": "600px",
        "box-shadow": "0 8px 32px rgba(0, 0, 0, 0.4)"
    };

    const previewContainerStyle = {
        background: "rgba(0, 0, 0, 0.2)",
        "border-radius": "12px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "16px",
        flex: 1,
        display: "flex",
        "flex-direction": "column",
        overflow: "hidden",
        position: "relative"
    };

    return (
        <ModalRoot size={ModalSizes.LARGE} style={{ background: "transparent", "box-shadow": "none" }}>
            <div style={glassContainerStyle}>
                <ModalHeader close={onCancel} style={{ background: "rgba(255,255,255,0.03)", "border-bottom": "1px solid rgba(255, 255, 255, 0.05)", padding: "16px 24px" }}>
                    <div style={{ display: "flex", "align-items": "baseline", gap: "12px" }}>
                        <Header tag={HeaderTags.H3} style={{ margin: 0, "font-weight": "700" }}>{t("plugin_name")}</Header>
                        <Show when={total > 0}>
                            <div style={{
                                background: "var(--brand-experiment)",
                                padding: "2px 8px",
                                "border-radius": "12px",
                                "font-size": "12px",
                                "font-weight": "bold",
                                color: "white"
                            }}>
                                {finished()} / {total}
                            </div>
                        </Show>
                    </div>
                </ModalHeader>

                <ModalBody style={bodyStyle}>
                    <div style={{ display: "flex", gap: "20px", height: "100%" }}>
                        {/* Main Content Area (Left/Top) */}
                        <div style={{ flex: 2, display: "flex", "flex-direction": "column", gap: "16px", overflow: "hidden" }}>
                            {/* Inspection View / Comparison */}
                            <Show when={!!inspectedItem()} fallback={
                                !started() ? (
                                    <div style={{ ...previewContainerStyle, "align-items": "center", "justify-content": "center", opacity: 0.5 }}>
                                        <Text>{t("preview_select")}</Text>
                                    </div>
                                ) : null
                            }>
                                <div style={previewContainerStyle}>
                                    <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "12px" }}>
                                        <Text tag={TextTags.textSM} style={{ "font-weight": "bold", opacity: 0.8 }}>
                                            {inspectedItem()?.name}
                                        </Text>
                                        <Show when={inspectedIndex() !== null}>
                                            <Button size={ButtonSizes.TINY} color={ButtonColors.SECONDARY} onClick={() => setInspectedIndex(null)}>
                                                {t("back_to_auto")}
                                            </Button>
                                        </Show>
                                    </div>

                                    <div style={{ flex: 1, overflow: "hidden", "border-radius": "8px", border: "1px solid rgba(0,0,0,0.5)" }}>
                                        <ComparisonView
                                            originalUrl={referenceType() === "auto" && inspectedItem()?.autoUrl ? inspectedItem()?.autoUrl : inspectedItem()?.previewUrl}
                                            compressedUrl={inspectedItem()?.compressedUrl || inspectedItem()?.previewUrl}
                                            originalSize={referenceType() === "auto" && inspectedItem()?.autoFile ? inspectedItem()?.autoFile?.size : inspectedItem()?.file?.size}
                                            compressedSize={inspectedItem()?.compressedFile?.size || inspectedItem()?.file?.size}
                                            metadata={inspectedItem()?.passMetadata}
                                            referenceType={referenceType}
                                            setReferenceType={setReferenceType}
                                            hasAutoResult={!!inspectedItem()?.autoUrl}
                                            isManual={inspectedItem()?.compressedUrl !== inspectedItem()?.autoUrl && !!inspectedItem()?.autoUrl}
                                            imageKey={inspectedItem()?.name}
                                        />
                                    </div>
                                </div>
                            </Show>

                            {/* Queue List */}
                            <div style={{ height: "140px", flexShrink: 0 }}>
                                <CompressionQueue
                                    queue={queue}
                                    inspectedIndex={inspectedIndex}
                                    setInspectedIndex={setInspectedIndex}
                                />
                            </div>
                        </div>

                        {/* Sidebar (Right) - Settings & Controls */}
                        <div style={{ flex: 1, "min-width": "300px", display: "flex", "flex-direction": "column", gap: "16px", overflowY: "auto" }}>
                            <Show when={inspectedItem()?.status === 'done'}>
                                <ManualCompressionControls
                                    localMaxDim={localMaxDim} setLocalMaxDim={setLocalMaxDim}
                                    localQuality={localQuality} setLocalQuality={setLocalQuality}
                                    localFormat={localFormat} setLocalFormat={setLocalFormat}
                                    onRecompress={onRecompress}
                                    onRestoreAuto={(idx) => {
                                        onRestoreAuto(idx);
                                        setReferenceType("original");
                                    }}
                                    hasAutoResult={!!inspectedItem()?.autoUrl}
                                    isManual={inspectedItem()?.compressedUrl !== inspectedItem()?.autoUrl && !!inspectedItem()?.autoUrl}
                                    index={inspectedIndex() !== null ? inspectedIndex() : queue().indexOf(inspectedItem())}
                                />
                            </Show>

                            <Show when={started() && !inspectedItem()?.status === 'done'}>
                                <div style={{
                                    padding: "20px",
                                    background: "rgba(255,255,255,0.02)",
                                    "border-radius": "12px",
                                    "text-align": "center"
                                }}>
                                    <Text style={{ opacity: 0.5 }}>{t("processing_images")}</Text>
                                    <Text tag={TextTags.textXS} style={{ opacity: 0.3, marginTop: "8px" }}>{t("select_to_recompress")}</Text>
                                </div>
                            </Show>
                        </div>
                    </div>
                </ModalBody>

                <ModalFooter style={{ background: "rgba(0, 0, 0, 0.2)", padding: "16px 24px" }}>
                    <div style={{ width: "100%", "display": "flex", "justify-content": "flex-end", "gap": "12px" }}>
                        <Show when={!started()}>
                            <Button size={ButtonSizes.MEDIUM} color={ButtonColors.SECONDARY} onClick={onCancel}>
                                {t("cancel")}
                            </Button>
                        </Show>

                        <Show when={started() && finished() !== total}>
                            <Button size={ButtonSizes.MEDIUM} color={ButtonColors.RED} onClick={onCancel}>
                                {t("cancel_abort")}
                            </Button>
                        </Show>

                        <Show when={started() && finished() === total}>
                            <Button size={ButtonSizes.MEDIUM} color={ButtonColors.SECONDARY} onClick={onCancel}>
                                {t("discard_all")}
                            </Button>
                            <Button size={ButtonSizes.MEDIUM} color={ButtonColors.BRAND} onClick={onConfirm}>
                                {t("use_optimized")}
                            </Button>
                        </Show>
                    </div>
                </ModalFooter>
            </div>
        </ModalRoot>
    );
};
