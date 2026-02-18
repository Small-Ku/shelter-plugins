import { Workflow, Strategy, Engine, DEFAULTS } from "../lib/constants";
import { t } from "../lib/i18n";

const {
    ui: {
        Text,
        Slider,
        Header,
        HeaderTags,
        Divider,
        Space
    }
} = shelter;

const SelectionItem = (props) => (
    <div style={{ "margin-bottom": "16px" }}>
        <Header tag={HeaderTags.H5} style={{ "margin-bottom": "4px" }}>{props.label}</Header>
        <Text style={{ "margin-bottom": "8px", opacity: 0.7, "font-size": "12px" }}>{props.note}</Text>
        <div style={{ "display": "flex", "gap": "8px", "flex-wrap": "wrap" }}>
            {props.options.map(opt => (
                <button
                    type="button"
                    onClick={() => { props.onChange(opt.value); }}
                    style={{
                        padding: "6px 12px",
                        "border-radius": "4px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        background: props.value === opt.value ? "var(--brand-experiment)" : "rgba(255, 255, 255, 0.05)",
                        color: props.value === opt.value ? "white" : "var(--text-normal)",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "font-size": "12px"
                    }}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    </div>
);

export const Settings = () => {
    const store = shelter.plugin.store;

    return (
        <div style={{ padding: "0 8px" }}>
            <Header tag={HeaderTags.H3} style={{ "margin-bottom": "16px", "margin-top": "8px" }}>{t("general_settings")}</Header>
            <SelectionItem
                label={t("upload_mode")}
                note={t("upload_mode_note")}
                value={store.workflow || DEFAULTS.workflow}
                onChange={(v) => { store.workflow = v; }}
                options={[
                    { label: t("review_before_upload"), value: Workflow.REVIEW },
                    { label: t("automatic_upload"), value: Workflow.DIRECT }
                ]}
            />

            <SelectionItem
                label={t("auto_compress_trigger")}
                note={t("auto_compress_trigger_note")}
                value={store.strategy || DEFAULTS.strategy}
                onChange={(v) => { store.strategy = v; }}
                options={[
                    { label: t("smart_size_limit"), value: Strategy.AUTO },
                    { label: t("always_compress"), value: Strategy.ONCE },
                    { label: t("never"), value: Strategy.NONE },
                ]}
            />

            <Divider mt mb />

            <Header tag={HeaderTags.H3} style={{ "margin-bottom": "16px" }}>{t("compression_pipeline")}</Header>
            <SelectionItem
                label={t("engine")}
                note={t("engine_note")}
                value={store.engine || DEFAULTS.engine}
                onChange={(v) => { store.engine = v; }}
                options={[
                    { label: t("jsquash_wasm"), value: Engine.JSQUASH },
                    { label: t("browser_canvas"), value: Engine.CANVAS }
                ]}
            />

            <SelectionItem
                label={t("output_format")}
                note={t("output_format_note")}
                value={store.format || DEFAULTS.format}
                onChange={(v) => { store.format = v; }}
                options={[
                    { label: t("jpeg"), value: "image/jpeg" },
                    { label: t("webp"), value: "image/webp" },
                    { label: t("png"), value: "image/png" }
                ]}
            />

            <Divider mt mb />

            <Header tag={HeaderTags.H3} style={{ "margin-bottom": "16px" }}>{t("default_params")}</Header>

            <div style={{ "display": "grid", "grid-template-columns": "1fr 1fr", gap: "16px" }}>
                <div>
                    <Header tag={HeaderTags.H5}>{t("comp_quality")}</Header>
                    <Text style={{ "font-size": "12px", opacity: 0.7 }}>{t("comp_quality_note")}</Text>
                    <div style={{ "margin-top": "8px" }}>
                        <Text>{Math.round((store.quality || DEFAULTS.quality) * 100)}%</Text>
                        <Slider
                            min={0.1} max={1.0} step={0.05}
                            value={store.quality || DEFAULTS.quality}
                            onInput={(v) => { store.quality = v; }}
                        />
                    </div>
                </div>

                <div>
                    <Header tag={HeaderTags.H5}>{t("convergence_accuracy")}</Header>
                    <Text style={{ "font-size": "12px", opacity: 0.7 }}>{t("convergence_accuracy_note")}</Text>
                    <div style={{ "margin-top": "8px" }}>
                        <Text>{Math.round((store.accuracy || DEFAULTS.accuracy) * 100)}%</Text>
                        <Slider
                            min={0.5} max={0.99} step={0.01}
                            value={store.accuracy || DEFAULTS.accuracy}
                            onInput={(v) => { store.accuracy = v; }}
                        />
                    </div>
                </div>
            </div>

            <Space />

            <div style={{ "margin-top": "8px" }}>
                <Header tag={HeaderTags.H5}>{t("max_dimension")}</Header>
                <Text style={{ "font-size": "12px", opacity: 0.7 }}>{t("max_dimension_note")}</Text>
                <Text>{store.maxDimension || DEFAULTS.maxDimension}px</Text>
                <Slider
                    min={512} max={8192} step={128}
                    value={store.maxDimension || DEFAULTS.maxDimension}
                    onInput={(v) => { store.maxDimension = v; }}
                />
            </div>

            <div style={{ "margin-top": "16px" }}>
                <Header tag={HeaderTags.H5}>{t("target_threshold")}</Header>
                <Text style={{ "font-size": "12px", opacity: 0.7 }}>{t("target_threshold_note")}</Text>
                <Text>{store.targetSize || DEFAULTS.targetSize}MB</Text>
                <Slider
                    min={0.5} max={50} step={0.5}
                    value={store.targetSize || DEFAULTS.targetSize}
                    onInput={(v) => { store.targetSize = v; }}
                />
            </div>
        </div>
    );
};

