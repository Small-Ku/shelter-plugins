const {
    solid: { createSignal, onMount, onCleanup, createMemo, Show, createEffect }
} = shelter;
import { t } from "../lib/i18n";

export const ComparisonView = (props) => {
    let containerRef;
    let resizeObserver;

    const [targetZoom, setTargetZoom] = createSignal(1);
    const [targetOffset, setTargetOffset] = createSignal({ x: 0, y: 0 });

    let currentZoom = 1;
    const currentOffset = { x: 0, y: 0 };

    const [isPanning, setIsPanning] = createSignal(false);
    const [imageSize, setImageSize] = createSignal({ w: 0, h: 0 });
    const [sliderPos, setSliderPos] = createSignal(50);
    const [isAnimating, setIsAnimating] = createSignal(false);
    const [containerSize, setContainerSize] = createSignal({ w: 0, h: 0 });

    let lastImageKey = null;

    const formatSize = (bytes) => {
        if (!bytes) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + (sizes[i] || "B");
    };

    const fitZoom = createMemo(() => {
        const { w: cw, h: ch } = containerSize();
        const { w: iw, h: ih } = imageSize();
        if (!cw || !iw) return 1;
        return Math.min(cw / iw, ch / ih);
    });

    const getConstrainedOffset = (zoom, offset) => {
        const { w: cw, h: ch } = containerSize();
        const { w: iw, h: ih } = imageSize();
        if (!cw || !iw) return offset;
        const dx = cw - iw * zoom;
        const dy = ch - ih * zoom;
        return {
            x: Math.max(Math.min(dx / 2, -dx / 2), Math.min(Math.max(dx / 2, -dx / 2), offset.x)),
            y: Math.max(Math.min(dy / 2, -dy / 2), Math.min(Math.max(dy / 2, -dy / 2), offset.y))
        };
    };

    const updateZoom = (newZoom, origin = { x: 0, y: 0 }) => {
        const oldZoom = targetZoom();
        if (newZoom === oldZoom) {
            setTargetOffset((prev) => getConstrainedOffset(newZoom, prev));
            return;
        }

        setTargetZoom(newZoom);
        setTargetOffset((prev) => {
            // Precise Zoom-to-point logic:
            // The point under the cursor should remain under the cursor after scaling.
            // newOffset = origin - (origin - oldOffset) * (newZoom / oldZoom)
            const ratio = newZoom / oldZoom;
            const nextX = origin.x - (origin.x - prev.x) * ratio;
            const nextY = origin.y - (origin.y - prev.y) * ratio;
            
            return getConstrainedOffset(newZoom, { x: nextX, y: nextY });
        });
    };

    let innerOriginalRef;
    let innerCompressedRef;
    let originalWrapperRef;
    let splitLineRef;

    const applyTransform = () => {
        // Use transform: translate + scale from the center
        const transform = `translate(calc(-50% + ${currentOffset.x}px), calc(-50% + ${currentOffset.y}px)) scale(${currentZoom})`;
        if (innerOriginalRef) innerOriginalRef.style.transform = transform;
        if (innerCompressedRef) innerCompressedRef.style.transform = transform;

        if (originalWrapperRef) {
            originalWrapperRef.style.clipPath = `inset(0 ${100 - sliderPos()}% 0 0)`;
        }
        if (splitLineRef) {
            splitLineRef.style.left = `${sliderPos()}%`;
        }
    };

    let rafId;
    const animate = () => {
        const tZ = targetZoom();
        const tO = targetOffset();

        // Smooth damping
        currentZoom += (tZ - currentZoom) * 0.25;
        currentOffset.x += (tO.x - currentOffset.x) * 0.25;
        currentOffset.y += (tO.y - currentOffset.y) * 0.25;

        if (Math.abs(tZ - currentZoom) < 0.001) currentZoom = tZ;
        if (Math.abs(tO.x - currentOffset.x) < 0.1) currentOffset.x = tO.x;
        if (Math.abs(tO.y - currentOffset.y) < 0.1) currentOffset.y = tO.y;

        applyTransform();

        if (
            currentZoom !== tZ ||
            currentOffset.x !== tO.x ||
            currentOffset.y !== tO.y
        ) {
            rafId = requestAnimationFrame(animate);
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            rafId = null;
        }
    };

    createEffect(() => {
        targetZoom();
        targetOffset();
        if (!rafId) rafId = requestAnimationFrame(animate);
    });

    createEffect(() => {
        sliderPos();
        if (!isAnimating()) applyTransform();
    });

    // URL Management: Sync sources for animation, but avoid flicker on iterative passes
    const [imgs, setImgs] = createSignal({ original: props.originalUrl, compressed: props.compressedUrl });
    
    createEffect(() => {
        const orig = props.originalUrl;
        const comp = props.compressedUrl;
        const key = props.imageKey;

        // If it's a new image, we clear both to attempt animation sync
        if (key !== lastImageKey) {
            setImgs({ original: "", compressed: "" });
            const timer = setTimeout(() => {
                setImgs({ original: orig, compressed: comp });
            }, 40);
            onCleanup(() => clearTimeout(timer));
        } else {
            // For iterative passes, just update compressed without clearing
            // This prevents the "blank modal" flicker during quality convergence
            setImgs((prev) => ({ ...prev, compressed: comp, original: orig }));
        }
    });

    const onImageLoad = (e) => {
        const img = e.target;
        if (img.naturalWidth === 0) return;

        setImageSize({ w: img.naturalWidth, h: img.naturalHeight });

        const key = props.imageKey;
        if (key !== lastImageKey) {
            const fit = fitZoom();
            setTargetZoom(fit);
            currentZoom = fit;
            setTargetOffset({ x: 0, y: 0 });
            currentOffset.x = 0;
            currentOffset.y = 0;
            lastImageKey = key;
        }
        applyTransform();
    };

    const handleMouseDown = (e) => {
        if (e.button === 0) setIsPanning(true);
    };

    const handleMouseUp = () => setIsPanning(false);

    const handleMouseMove = (e) => {
        if (isPanning()) {
            currentOffset.x += e.movementX;
            currentOffset.y += e.movementY;
            setTargetOffset({ x: currentOffset.x, y: currentOffset.y });
            applyTransform();
        } else {
            const rect = containerRef.getBoundingClientRect();
            const x = Math.max(
                0,
                Math.min(100, ((e.clientX - rect.left) / rect.width) * 100),
            );
            setSliderPos(x);
        }
    };

    onMount(() => {
        window.addEventListener("mouseup", handleMouseUp);
        if (containerRef) {
            resizeObserver = new ResizeObserver(() => {
                setContainerSize({
                    w: containerRef.clientWidth,
                    h: containerRef.clientHeight,
                });
                // Ensure viewport stays valid on resize
                const zoom = targetZoom();
                setTargetOffset(prev => getConstrainedOffset(zoom, prev));
                applyTransform();
            });
            resizeObserver.observe(containerRef);
        }
    });

    onCleanup(() => {
        window.removeEventListener("mouseup", handleMouseUp);
        if (resizeObserver) resizeObserver.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
    });

    const displayZoomPercent = createMemo(() => Math.round(targetZoom() * 100));

    const layerStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    };

    const innerStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        // Use center origin for consistent math
        "transform-origin": "center",
        display: "block",
        "pointer-events": "none",
    };

    const imgStyle = {
        display: "block",
        "user-select": "none",
        "-webkit-user-drag": "none",
    };

    return (
        <div style={{ display: "flex", "flex-direction": "column", gap: "8px" }}>
            <div
                ref={containerRef}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "360px",
                    background: "#16171a",
                    "border-radius": "8px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: isPanning() ? "grabbing" : "crosshair",
                    "user-select": "none",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsPanning(false)}
                onWheel={(e) => {
                    e.preventDefault();
                    const rect = containerRef.getBoundingClientRect();
                    // Origin relative to the center of the container
                    const origin = {
                        x: e.clientX - rect.left - rect.width / 2,
                        y: e.clientY - rect.top - rect.height / 2,
                    };
                    const delta = e.deltaY > 0 ? 0.85 : 1.15;
                    const newZoom = Math.min(
                        Math.max(targetZoom() * delta, fitZoom() * 0.5),
                        15,
                    );
                    updateZoom(newZoom, origin);
                }}
            >
                {/* Layer 1: Compressed (Base) */}
                <div style={layerStyle}>
                    <div ref={innerCompressedRef} style={innerStyle}>
                        <Show when={imgs().compressed}>
                            <img
                                src={imgs().compressed}
                                onLoad={onImageLoad}
                                draggable={false}
                                style={imgStyle}
                                alt=""
                            />
                        </Show>
                    </div>
                </div>

                {/* Layer 2: Original (Overlayed & Clipped) */}
                <div
                    ref={originalWrapperRef}
                    style={{ ...layerStyle, "z-index": 1 }}
                >
                    <div ref={innerOriginalRef} style={innerStyle}>
                        <Show when={imgs().original}>
                            <img
                                src={imgs().original}
                                onLoad={onImageLoad}
                                draggable={false}
                                style={imgStyle}
                                alt=""
                            />
                        </Show>
                    </div>
                </div>

                {/* Split Line */}
                <div
                    ref={splitLineRef}
                    style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        width: "2px",
                        background: "rgba(255,255,255,0.9)",
                        "box-shadow": "0 0 4px rgba(0,0,0,0.5)",
                        "pointer-events": "none",
                        "z-index": 2,
                        transform: "translateX(-50%)",
                    }}
                />

                <Show when={props.metadata}>
                    <div
                        style={{
                            position: "absolute",
                            top: "8px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "rgba(88, 101, 242, 0.9)",
                            padding: "4px 8px",
                            "border-radius": "4px",
                            "font-size": "10px",
                            color: "white",
                            "pointer-events": "none",
                            "backdrop-filter": "blur(4px)",
                            "z-index": 3,
                        }}
                    >
                        {t("pass_info", {
                            pass: props.metadata.pass,
                            quality: Math.round(props.metadata.quality * 100),
                        })}
                    </div>
                </Show>

                <div
                    style={{
                        position: "absolute",
                        bottom: "8px",
                        left: "8px",
                        right: "8px",
                        display: "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        "pointer-events": "none",
                        "z-index": 3,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            "align-items": "center",
                            gap: "4px",
                            background: "rgba(0,0,0,0.7)",
                            padding: "0 6px",
                            height: "20px",
                            "border-radius": "4px",
                            "pointer-events": "auto",
                        }}
                    >
                        <Show when={props.hasAutoResult && props.isManual}>
                            <button
                                type="button"
                                onClick={() =>
                                    props.setReferenceType((prev) =>
                                        prev === "original" ? "auto" : "original",
                                    )
                                }
                                style={{
                                    background:
                                        props.referenceType() === "auto"
                                            ? "var(--brand-experiment)"
                                            : "rgba(255,255,255,0.1)",
                                    border: "none",
                                    color: "white",
                                    "font-size": "9px",
                                    "border-radius": "3px",
                                    padding: "1px 4px",
                                    cursor: "pointer",
                                    "margin-right": "4px",
                                    "font-weight": "600",
                                }}
                            >
                                {props.referenceType() === "auto"
                                    ? t("vs_orig")
                                    : t("vs_auto")}
                            </button>
                        </Show>
                        <span
                            style={{
                                "font-size": "10px",
                                color: "white",
                                "font-weight": "600",
                            }}
                        >
                            {props.referenceType() === "auto"
                                ? t("auto_label")
                                : t("orig_label")}
                            {formatSize(props.originalSize)}
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            "align-items": "center",
                            gap: "6px",
                            background: "rgba(0,0,0,0.7)",
                            padding: "0 6px",
                            height: "20px",
                            "border-radius": "4px",
                            "pointer-events": "auto",
                        }}
                    >
                        <span
                            style={{
                                "font-size": "10px",
                                color: "white",
                                "font-weight": "600",
                                "text-align": "right",
                            }}
                        >
                            {displayZoomPercent()}%
                        </span>
                        <input
                            type="range"
                            min="0.05"
                            max="5"
                            step="0.01"
                            value={targetZoom()}
                            onInput={(e) => updateZoom(parseFloat(e.target.value))}
                            style={{
                                width: "80px",
                                height: "4px",
                                "-webkit-appearance": "none",
                                background: "rgba(255,255,255,0.2)",
                                "border-radius": "2px",
                                outline: "none",
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => updateZoom(1)}
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                "font-size": "9px",
                                "border-radius": "3px",
                                padding: "1px 4px",
                                cursor: "pointer",
                            }}
                        >
                            1:1
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setTargetZoom(fitZoom());
                                setTargetOffset({ x: 0, y: 0 });
                            }}
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                "font-size": "9px",
                                "border-radius": "3px",
                                padding: "1px 4px",
                                cursor: "pointer",
                            }}
                        >
                            {t("fit")}
                        </button>
                    </div>

                    <div
                        style={{
                            background: "rgba(0,0,0,0.7)",
                            padding: "0 6px",
                            height: "20px",
                            "border-radius": "4px",
                            "font-size": "10px",
                            color: "white",
                            "font-weight": "600",
                            "pointer-events": "auto",
                        }}
                    >
                        {t("result_label")} {formatSize(props.compressedSize)} (-
                        {Math.round(
                            (1 - (props.compressedSize / props.originalSize || 0)) * 100,
                        )}
                        %)
                    </div>
                </div>
            </div>
        </div>
    );
};
