const {
    solid: { createSignal, onMount, onCleanup, createMemo, Show, createEffect }
} = shelter;
import { t } from "../lib/i18n";

export const ComparisonView = (props) => {
    // Canvas & State
    let canvasRef;
    let containerRef;
    let resizeObserver;

    // Target State (Where we want to be)
    const [targetZoom, setTargetZoom] = createSignal(1);
    const [targetOffset, setTargetOffset] = createSignal({ x: 0, y: 0 });

    // Animation State (Current visual values)
    // We use refs (variables) for animation values to avoid Reactivity overhead in loop
    let currentZoom = 1;
    const currentOffset = { x: 0, y: 0 };

    const [isPanning, setIsPanning] = createSignal(false);
    const [imageSize, setImageSize] = createSignal({ w: 0, h: 0 });
    const [sliderPos, setSliderPos] = createSignal(50); // 0-100%
    const [isAnimating, setIsAnimating] = createSignal(false);

    // Image Objects (Persistent across renders)
    const imgOriginal = new Image();
    const imgCompressed = new Image();
    let lastImageKey = null;

    // Helper: Format Size
    const formatSize = (bytes) => {
        if (!bytes) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + (sizes[i] || "B");
    };

    // Draw Function
    const draw = () => {
        if (!canvasRef || !imageSize().w) return;
        const ctx = canvasRef.getContext("2d");
        const { width, height } = canvasRef;
        const w = imageSize().w;
        const h = imageSize().h;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // --- Layout Math ---
        // Center the image in the canvas view
        const centerX = width / 2 + currentOffset.x;
        const centerY = height / 2 + currentOffset.y;

        const zoom = currentZoom;

        // 1. Draw Compressed (Base Layer)
        // No clipping, just draw full image transformed
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(zoom, zoom);
        ctx.translate(-w / 2, -h / 2);

        // Use nearest neighbor if zoom > 1 for pixel peeping, or smoothing if < 1?
        // Let's stick to default (usually bilinear) for photo compression
        ctx.imageSmoothingEnabled = zoom < 1;

        if (imgCompressed.complete && imgCompressed.naturalWidth) {
            ctx.drawImage(imgCompressed, 0, 0, w, h);
        }
        ctx.restore();

        // 2. Draw Original (Overlay Layer with Clip)
        if (imgOriginal.complete && imgOriginal.naturalWidth) {
            ctx.save();

            // Define Clip Region (Screen Space)
            const splitX = (width * sliderPos()) / 100;

            ctx.beginPath();
            ctx.rect(0, 0, splitX, height);
            ctx.clip();

            // Draw Original Transformed
            ctx.translate(centerX, centerY);
            ctx.scale(zoom, zoom);
            ctx.translate(-w / 2, -h / 2);
            ctx.imageSmoothingEnabled = zoom < 1;

            ctx.drawImage(imgOriginal, 0, 0, w, h);

            ctx.restore();
        }

        // 3. Draw Split Line & Handle
        const splitX = (width * sliderPos()) / 100;

        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
        ctx.lineWidth = 2;
        ctx.moveTo(splitX, 0);
        ctx.lineTo(splitX, height);
        ctx.stroke();

        // Glow
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 4;
        ctx.stroke();
        ctx.shadowBlur = 0;
    };

    // Animation Loop
    let rafId;
    const animate = () => {
        // Lerp logic
        const tZ = targetZoom();
        const tO = targetOffset();

        // Use simple ease-out lerp
        // Factor 0.2 gives smooth catch-up
        currentZoom += (tZ - currentZoom) * 0.2;
        currentOffset.x += (tO.x - currentOffset.x) * 0.2;
        currentOffset.y += (tO.y - currentOffset.y) * 0.2;

        // Snap if close
        if (Math.abs(tZ - currentZoom) < 0.001) currentZoom = tZ;
        if (Math.abs(tO.x - currentOffset.x) < 0.1) currentOffset.x = tO.x;
        if (Math.abs(tO.y - currentOffset.y) < 0.1) currentOffset.y = tO.y;

        draw();

        if (currentZoom !== tZ || currentOffset.x !== tO.x || currentOffset.y !== tO.y) {
            rafId = requestAnimationFrame(animate);
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            rafId = null;
        }
    };

    const getConstrainedOffset = (zoom, offset) => {
        if (!canvasRef || !imageSize().w) return offset;
        const { width, height } = canvasRef;
        const dx = width - imageSize().w * zoom;
        const dy = height - imageSize().h * zoom;

        return {
            x: Math.max(Math.min(dx / 2, -dx / 2), Math.min(Math.max(dx / 2, -dx / 2), offset.x)),
            y: Math.max(Math.min(dy / 2, -dy / 2), Math.min(Math.max(dy / 2, -dy / 2), offset.y))
        };
    };

    const updateZoom = (newZoom) => {
        const oldZoom = targetZoom();
        if (newZoom === oldZoom) {
            // Even if zoom hasn't changed, we might want to re-constrain
            setTargetOffset(prev => getConstrainedOffset(newZoom, prev));
            return;
        }

        setTargetZoom(newZoom);

        // Keep viewport center: scale the offset by the zoom ratio
        setTargetOffset(prev => {
            const scaled = {
                x: prev.x * (newZoom / oldZoom),
                y: prev.y * (newZoom / oldZoom)
            };
            return getConstrainedOffset(newZoom, scaled);
        });
    };

    // Trigger animation when targets change
    createEffect(() => {
        targetZoom(); targetOffset();
        if (!rafId) {
            rafId = requestAnimationFrame(animate);
        }
    });

    // Also trigger draw if sliderPos changes (instant update, no lerp needed usually)
    createEffect(() => {
        sliderPos();
        // If not animating, draw once. If animating, loop covers it.
        if (!isAnimating()) draw();
    });

    // Load Images
    createEffect(() => {
        const url = props.originalUrl;
        const key = props.imageKey;
        if (url) {
            imgOriginal.src = url;
            imgOriginal.onload = () => {
                setImageSize({ w: imgOriginal.naturalWidth, h: imgOriginal.naturalHeight });

                // Only reset viewport if the image identity actually changed (e.g. new file selected in queue)
                if (key !== lastImageKey) {
                    const fit = fitZoom();
                    setTargetZoom(fit);
                    currentZoom = fit;
                    setTargetOffset({ x: 0, y: 0 });
                    currentOffset.x = 0;
                    currentOffset.y = 0;
                    lastImageKey = key;
                }
                draw();
            };
        }
    });

    createEffect(() => {
        if (props.compressedUrl) {
            imgCompressed.src = props.compressedUrl;
            imgCompressed.onload = draw;
        }
    });

    // --- Interaction ---

    const handleMouseDown = (e) => {
        if (e.button === 0) setIsPanning(true);
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleMouseMove = (e) => {
        const rect = canvasRef.getBoundingClientRect();

        if (isPanning()) {
            setTargetOffset(prev => ({
                x: prev.x + e.movementX,
                y: prev.y + e.movementY
            }));
            // Current offset needs to follow instantly for dragging feel?
            // Actually, if we lerp dragging, it feels floaty.
            // For Panning, we usually want 1:1 response.
            // Override currentOffset directly?
            // Yes:
            currentOffset.x += e.movementX;
            currentOffset.y += e.movementY;
            // Also update target to match current so lerp doesn't fight back
            // setTargetOffset({ x: currentOffset.x, y: currentOffset.y }); // Updated above via state updater is safer
            // Wait, if setTargetOffset updates state, effect triggers loop, loop lerps current to target.
            // If current is manually updated, lerp starts from new current.
            // So:
            // 1. Manually constrain currentOffset.
            // 2. Set targetOffset to match
            // But strict state management says modify target.
            // If dragging is laggy with lerp, we can skip lerp for panning.
            // Let's rely on standard loop - at 0.2 factor it might feel slightly loose but smooth.
            // If user wants "responsiveness", direct update is better.
            // Let's force update currentOffset for instant drag.
            // But we need to keep targetOffset in sync.
        } else {
            // Update split pos
            // Use local coordinates
            const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
            setSliderPos(x);
        }
    };

    const handleMouseLeave = () => {
        setIsPanning(false);
    }

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newZoom = Math.min(Math.max(targetZoom() * delta, fitZoom() * 0.5), 10);
        updateZoom(newZoom);
    };

    // --- Resize & Fit ---

    // Track resize for fit logic
    const [checkResize, setCheckResize] = createSignal(0);

    const fitZoom = createMemo(() => {
        checkResize(); // Dependency
        if (!imageSize().w || !canvasRef) return 0.1;
        const { width, height } = canvasRef;
        if (!width) return 0.1;

        // Exact fit logic (no padding)
        const scaleW = width / imageSize().w;
        const scaleH = height / imageSize().h;
        return Math.min(scaleW, scaleH);
    });

    onMount(() => {
        window.addEventListener('mouseup', handleMouseUp);

        if (containerRef) {
            resizeObserver = new ResizeObserver(() => {
                if (canvasRef && containerRef) {
                    canvasRef.width = containerRef.clientWidth;
                    canvasRef.height = containerRef.clientHeight;
                    setCheckResize(c => c + 1); // Trigger update
                    // Force redraw
                    if (!isAnimating()) draw();
                }
            });
            resizeObserver.observe(containerRef);
        }
    });

    onCleanup(() => {
        window.removeEventListener('mouseup', handleMouseUp);
        if (resizeObserver) resizeObserver.disconnect();
        if (rafId) cancelAnimationFrame(rafId);
    });

    const displayZoomPercent = createMemo(() => Math.round(targetZoom() * 100));

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
                    border: "1px solid rgba(255,255,255,0.05)"
                }}
            >
                <canvas
                    ref={canvasRef}
                    style={{ width: "100%", height: "100%", display: "block", cursor: isPanning() ? "grabbing" : "crosshair" }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onWheel={handleWheel}
                />

                {/* Status Overlay */}
                <Show when={props.metadata}>
                    <div style={{
                        position: "absolute", top: "8px", left: "50%", transform: "translateX(-50%)",
                        background: "rgba(88, 101, 242, 0.9)",
                        padding: "4px 8px", "border-radius": "4px",
                        "font-size": "10px", color: "white", "pointer-events": "none", "backdrop-filter": "blur(4px)"
                    }}>
                        {t("pass_info", { pass: props.metadata.pass, quality: Math.round(props.metadata.quality * 100) })}
                    </div>
                </Show>

                {/* Bottom Bar: Stats & Controls */}
                <div style={{
                    position: "absolute",
                    bottom: "8px",
                    left: "8px",
                    right: "8px",
                    display: "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                    "pointer-events": "none"
                }}>
                    {/* Reference Selection & Size */}
                    <div style={{
                        display: "flex",
                        "align-items": "center",
                        gap: "4px",
                        background: "rgba(0,0,0,0.7)",
                        padding: "0 6px",
                        height: "20px",
                        "border-radius": "4px",
                        "pointer-events": "auto"
                    }}>
                        <Show when={props.hasAutoResult && props.isManual}>
                            <button
                                type="button"
                                onClick={() => props.setReferenceType(prev => prev === "original" ? "auto" : "original")}
                                style={{
                                    background: props.referenceType() === "auto" ? "var(--brand-experiment)" : "rgba(255,255,255,0.1)",
                                    border: "none",
                                    color: "white",
                                    "font-size": "9px",
                                    "border-radius": "3px",
                                    padding: "1px 4px",
                                    cursor: "pointer",
                                    "margin-right": "4px",
                                    "font-weight": "600"
                                }}
                            >
                                {props.referenceType() === "auto" ? t("vs_orig") : t("vs_auto")}
                            </button>
                        </Show>
                        <span style={{
                            "font-size": "10px",
                            color: "white",
                            "font-weight": "600"
                        }}>
                            {props.referenceType() === "auto" ? t("auto_label") : t("orig_label")}{formatSize(props.originalSize)}
                        </span>
                    </div>

                    {/* Custom Zoom Controls */}
                    <div style={{
                        display: "flex",
                        "align-items": "center",
                        gap: "6px",
                        background: "rgba(0,0,0,0.7)",
                        padding: "0 6px",
                        height: "20px",
                        "border-radius": "4px",
                        "pointer-events": "auto"
                    }}>
                        <span style={{ "font-size": "10px", color: "white", "font-weight": "600", "min-width": "24px", "text-align": "right" }}>
                            {displayZoomPercent()}%
                        </span>

                        <input
                            type="range"
                            min="0.05" max="5" step="0.01"
                            value={targetZoom()}
                            onInput={(e) => updateZoom(parseFloat(e.target.value))}
                            style={{
                                width: "80px",
                                height: "4px",
                                "-webkit-appearance": "none",
                                background: "rgba(255,255,255,0.2)",
                                "border-radius": "2px",
                                outline: "none",
                                margin: 0
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
                                transition: "background 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            1:1
                        </button>

                        <button
                            type="button"
                            onClick={() => { setTargetZoom(fitZoom()); setTargetOffset({ x: 0, y: 0 }); }}
                            style={{
                                background: "transparent",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                "font-size": "9px",
                                "border-radius": "3px",
                                padding: "1px 4px",
                                cursor: "pointer",
                                transition: "background 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                        >
                            {t("fit")}
                        </button>
                    </div>

                    {/* Result Size */}
                    <div style={{
                        display: "flex",
                        "align-items": "center",
                        background: "rgba(0,0,0,0.7)",
                        padding: "0 6px",
                        height: "20px",
                        "border-radius": "4px",
                        "font-size": "10px",
                        color: "white",
                        "font-weight": "600",
                        "pointer-events": "auto"
                    }}>
                        {t("result_label")} {formatSize(props.compressedSize)} (-{Math.round((1 - (props.compressedSize / props.originalSize || 0)) * 100)}%)
                    </div>
                </div>
            </div>
        </div>
    );
};
