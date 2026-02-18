// CompressionQueue.jsx
const {
    solid: { For, Show },
} = shelter;

export const CompressionQueue = (props) => {
    const { queue, inspectedIndex, setInspectedIndex } = props;

    // Use a CSS grid for better layout of queue items
    const gridStyle = {
        display: "grid",
        "grid-template-columns": "repeat(auto-fill, minmax(90px, 1fr))",
        gap: "10px",
        padding: "12px"
    };

    const containerStyle = {
        background: "rgba(0, 0, 0, 0.3)",
        "border-radius": "12px",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        overflow: "hidden", // Helps with rounded corners
        marginTop: "auto" // Pushes to bottom if flex container has space
    };

    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                <For each={queue()}>
                    {(item, idx) => {
                        const isSelected = () => inspectedIndex() === idx();
                        const isInteractable = item.status === 'done' || item.status === 'compressing';

                        return (
                            <button
                                type="button"
                                onClick={() => isInteractable && setInspectedIndex(idx())}
                                style={{
                                    position: "relative",
                                    aspectRatio: "1/1",
                                    "border-radius": "8px",
                                    overflow: "hidden",
                                    background: "rgba(32, 34, 37, 0.5)",
                                    border: isSelected()
                                        ? "2px solid var(--brand-experiment)"
                                        : (item.status === 'compressing' ? "2px dashed var(--brand-experiment)" : "1px solid rgba(255,255,255,0.1)"),
                                    cursor: isInteractable ? "pointer" : "default",
                                    padding: 0,
                                    margin: 0,
                                    outline: "none",
                                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                                    transform: isSelected() ? "scale(1.02)" : "scale(1)",
                                    "box-shadow": isSelected() ? "0 4px 12px rgba(0,0,0,0.3)" : "none"
                                }}
                                class="queue-item"
                            >
                                <Show when={item.previewUrl}>
                                    <img
                                        src={item.previewUrl}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            "object-fit": "cover",
                                            opacity: item.status === 'pending' ? 0.4 : 1,
                                            transition: "opacity 0.3s ease"
                                        }}
                                        alt={item.name}
                                    />
                                </Show>

                                {/* Status Badge */}
                                <div style={{
                                    position: "absolute",
                                    top: "6px",
                                    right: "6px",
                                    background: item.status === 'done' ? "rgba(59, 165, 93, 0.95)" : "rgba(0, 0, 0, 0.7)",
                                    "backdrop-filter": "blur(4px)",
                                    padding: "2px 6px",
                                    "border-radius": "4px",
                                    "font-size": "9px",
                                    "font-weight": "700",
                                    "text-transform": "uppercase",
                                    color: "white",
                                    "box-shadow": "0 2px 4px rgba(0,0,0,0.2)"
                                }}>
                                    {item.status === 'compressing' && item.currentPass
                                        ? `Pass ${item.currentPass}`
                                        : (item.status === 'pending' ? 'WAIT' : item.status)}
                                </div>

                                {/* Size Reduction Tag - Only show when done */}
                                <Show when={item.status === 'done'}>
                                    <div style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)",
                                        padding: "8px 4px 4px",
                                        "text-align": "center",
                                        "font-size": "10px",
                                        "font-weight": "600",
                                        color: "#fff",
                                        "text-shadow": "0 1px 2px rgba(0,0,0,0.8)"
                                    }}>
                                        -{Math.round((1 - (item.compressedFile?.size || 0) / item.file.size) * 100)}%
                                    </div>
                                </Show>
                            </button>
                        );
                    }}
                </For>
            </div>
            <style>{`
                .queue-item:hover { filter: brightness(1.1); transform: translateY(-1px); }
                .queue-item:active { transform: translateY(0) scale(0.98); }
            `}</style>
        </div>
    );
};
