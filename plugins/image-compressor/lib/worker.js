// Web Worker for Image Compression
// Since this is intended for shelter, we will export a function that generates the worker blob
// to avoid pathing issues in a remote environment.

export const createWorkerCode = () => `
    let jpeg, png, webp, oxipng, resize;

    async function initCodecs() {
        if (jpeg) return;
        try {
            [jpeg, png, webp, oxipng, resize] = await Promise.all([
                import("https://esm.sh/@jsquash/jpeg@1.6.0"),
                import("https://esm.sh/@jsquash/png@3.1.1"),
                import("https://esm.sh/@jsquash/webp@1.5.0"),
                import("https://esm.sh/@jsquash/oxipng@2.3.0"),
                import("https://esm.sh/@jsquash/resize@2.1.1"),
            ]);
        } catch (e) {
            console.error("[Worker] Failed to load codecs:", e);
        }
    }

    self.onmessage = async (e) => {
        const { id, type, options } = e.data;
        let { imageData } = e.data;
        
        try {
            await initCodecs();

            // Handle Resizing in Worker
            if (imageData.width > options.maxDimension || imageData.height > options.maxDimension) {
                let width = imageData.width;
                let height = imageData.height;
                const maxDim = options.maxDimension;

                if (width > height) {
                    height = Math.round(height * (maxDim / width));
                    width = maxDim;
                } else {
                    width = Math.round(width * (maxDim / height));
                    height = maxDim;
                }

                if (resize) {
                    imageData = await resize.default(imageData, { width, height });
                }
            }

            let outputBuffer;
            if (options.format === "image/webp" && webp) {
                outputBuffer = await webp.encode(imageData, { quality: options.quality * 100 });
            } else if (options.format === "image/png" && png) {
                outputBuffer = await png.encode(imageData);
                if (options.useOxipng && oxipng) {
                    try {
                        outputBuffer = await oxipng.optimise(outputBuffer);
                    } catch (err) {
                        console.warn("[Worker] OxiPNG failed:", err);
                    }
                }
            } else if (jpeg) {
                outputBuffer = await jpeg.encode(imageData, { quality: options.quality * 100 });
            } else {
                throw new Error("No codec available for format in worker");
            }

            self.postMessage({ id, success: true, buffer: outputBuffer }, [outputBuffer]);
        } catch (err) {
            self.postMessage({ id, success: false, error: err.message });
        }
    };
`;
