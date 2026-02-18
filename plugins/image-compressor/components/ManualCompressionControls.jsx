import { t } from "../lib/i18n";

const {
    ui: {
        Button,
        ButtonColors,
        ButtonSizes,
        Slider,
        Text,
        TextTags
    },
    solid: { For }
} = shelter;

export const ManualCompressionControls = (props) => {
    const {
        localMaxDim, setLocalMaxDim,
        localQuality, setLocalQuality,
        localFormat, setLocalFormat,
        localEngine, setLocalEngine,
        localUseOxipng, setLocalUseOxipng,
        onRecompress,
        index
    } = props;

    const controlStyle = {
        "margin-top": "12px",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.4)",
        "border-radius": "8px",
        border: "1px solid rgba(255, 255, 255, 0.05)"
    };

    const headerStyle = {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        "margin-bottom": "12px"
    };

    const rowStyle = {
        display: "grid",
        "grid-template-columns": "1fr 1fr",
        gap: "16px",
        "margin-bottom": "16px"
    };

    const labelStyle = {
        display: "flex",
        "justify-content": "space-between",
        "align-items": "center",
        "margin-bottom": "4px"
    };

    const valueStyle = {
        color: "var(--brand-experiment)",
        "font-family": "monospace",
        "font-size": "12px"
    };

    const formats = [
        { label: t("jpeg"), value: "image/jpeg" },
        { label: t("webp"), value: "image/webp" },
        { label: t("png"), value: "image/png" }
    ];

    const engines = [
        { label: t("jsquash_wasm"), value: "jsquash" },
        { label: t("browser_canvas"), value: "canvas" }
    ];

    return (
        <div style={controlStyle}>
            <div style={headerStyle}>
                <Text tag={TextTags.textSM} style={{ opacity: 0.9, "font-weight": "bold" }}>{t("manual_comp")}</Text>
            </div>

            <div style={{ "margin-bottom": "16px" }}>
                <div style={labelStyle}>
                    <Text tag={TextTags.textXS}>{t("output_format")}</Text>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                    <For each={formats}>
                        {(fmt) => (
                            <button
                                type="button"
                                onClick={() => setLocalFormat(fmt.value)}
                                style={{
                                    flex: 1,
                                    padding: "4px",
                                    "font-size": "10px",
                                    "border-radius": "4px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: localFormat() === fmt.value ? "var(--brand-experiment)" : "rgba(255, 255, 255, 0.05)",
                                    color: localFormat() === fmt.value ? "white" : "var(--text-normal)",
                                    cursor: "pointer"
                                }}
                            >
                                {fmt.label}
                            </button>
                        )}
                    </For>
                </div>
            </div>

            <div style={{ "margin-bottom": "16px" }}>
                <div style={labelStyle}>
                    <Text tag={TextTags.textXS}>{t("engine")}</Text>
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                    <For each={engines}>
                        {(eng) => (
                            <button
                                type="button"
                                onClick={() => setLocalEngine(eng.value)}
                                style={{
                                    flex: 1,
                                    padding: "4px",
                                    "font-size": "10px",
                                    "border-radius": "4px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    background: localEngine() === eng.value ? "var(--brand-experiment)" : "rgba(255, 255, 255, 0.05)",
                                    color: localEngine() === eng.value ? "white" : "var(--text-normal)",
                                    cursor: "pointer"
                                }}
                            >
                                {eng.label}
                            </button>
                        )}
                    </For>
                </div>
            </div>

            <div style={{ "display": "flex", "flex-direction": "column", gap: "16px", "margin-bottom": "16px" }}>
                <div style={rowStyle}>
                    <div>
                        <div style={labelStyle}>
                            <Text tag={TextTags.textXS}>{t("comp_quality")}</Text>
                            <span style={valueStyle}>{Math.round(localQuality() * 100)}%</span>
                        </div>
                        <Slider min={0.1} max={1.0} step={0.05} value={localQuality()} onInput={setLocalQuality} />
                    </div>
                    <div>
                        <div style={labelStyle}>
                            <Text tag={TextTags.textXS}>{t("max_dimension")}</Text>
                            <span style={valueStyle}>{localMaxDim()}px</span>
                        </div>
                        <Slider min={512} max={8192} step={128} value={localMaxDim()} onInput={setLocalMaxDim} />
                    </div>
                </div>

                <Show when={localFormat() === "image/png"}>
                    <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", background: "rgba(255,255,255,0.03)", padding: "8px", "border-radius": "4px" }}>
                        <Text tag={TextTags.textXS}>{t("oxipng_opt")}</Text>
                        <input
                            type="checkbox"
                            checked={localUseOxipng()}
                            onChange={(e) => setLocalUseOxipng(e.target.checked)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                </Show>
            </div>

            <div style={{ display: "flex", "flex-direction": "column", gap: "8px" }}>
                <Button
                    size={ButtonSizes.SMALL}
                    color={ButtonColors.BRAND}
                    onClick={() => {
                        onRecompress?.(index, {
                            quality: localQuality(),
                            maxDim: localMaxDim(),
                            format: localFormat(),
                            engine: localEngine(),
                            useOxipng: localUseOxipng()
                        });
                    }}
                    style={{ width: "100%" }}
                >
                    {t("start_manual")}
                </Button>

                <Show when={props.hasAutoResult && props.isManual}>
                    <Button
                        size={ButtonSizes.TINY}
                        color={ButtonColors.RED}
                        look={Button.Looks?.OUTLINED}
                        onClick={() => props.onRestoreAuto?.(index)}
                        style={{ width: "100%" }}
                    >
                        {t("discard_manual")}
                    </Button>
                </Show>
            </div>
        </div>
    );
};
