const {
	util: { log },
} = shelter;

let worker = null;
let jobId = 0;
const pendingJobs = new Map();

export async function initCodecs() {
	if (worker) return;

	try {
		// We implement a 'Blob Worker' to ensure it works within the Discord/Shelter environment
		// without needing separate file bundles that might not be correctly resolved.
		const workerCode = `
const ESM_URL = "https://esm.sh/@imagemagick/magick-wasm@0.0.38";
const WASM_URL = "https://esm.sh/@imagemagick/magick-wasm@0.0.38/dist/magick.wasm";

let initialized = false;
let _ImageMagick;
let _MagickFormat;

async function init() {
    if (initialized) return;
    const magick = await import(/* @vite-ignore */ ESM_URL);
    _ImageMagick = magick.ImageMagick;
    _MagickFormat = magick.MagickFormat;
    await magick.initializeImageMagick(new URL(WASM_URL));
    initialized = true;
}

function toMagickFormat(mime) {
    const F = _MagickFormat;
    switch (mime) {
        case "image/jpeg": return F.Jpeg;
        case "image/png": return F.Png;
        case "image/gif": return F.Gif;
        case "image/avif": return F.Avif;
        case "image/webp":
        default: return F.WebP;
    }
}

self.onmessage = async (e) => {
    const { id, type, payload } = e.data;

    if (type === "INIT") {
        try {
            await init();
            self.postMessage({ id, type: "INIT_DONE" });
        } catch (err) {
            self.postMessage({ id, type: "ERROR", error: err.message });
        }
    }

    if (type === "PROCESS") {
        try {
            await init();
            const { bytes, quality, maxDimension, format } = payload;
            const magickFormat = toMagickFormat(format);
            const qualityInt = Math.round(quality * 100);

            _ImageMagick.readCollection(new Uint8Array(bytes), (frames) => {
                for (const frame of frames) {
                    if (frame.width > maxDimension || frame.height > maxDimension) {
                        const scale = maxDimension / Math.max(frame.width, frame.height);
                        const newW = Math.round(frame.width * scale);
                        const newH = Math.round(frame.height * scale);
                        frame.resize(newW, newH);
                    }
                    frame.quality = qualityInt;
                }

                frames.write(magickFormat, (data) => {
                    // data is a view into WASM memory, we MUST copy it before transferring
                    const buffer = data.slice().buffer;
                    self.postMessage({ 
                        id, 
                        type: "PROCESS_DONE", 
                        payload: { data: buffer, quality } 
                    }, [buffer]);
                });
            });
        } catch (err) {
            self.postMessage({ id, type: "ERROR", error: err.message });
        }
    }
};
		`;

		const blob = new Blob([workerCode], { type: "application/javascript" });
		const url = URL.createObjectURL(blob);
		worker = new Worker(url, { type: "module" });

		worker.onmessage = (e) => {
			const { id, type, payload, error } = e.data;
			const job = pendingJobs.get(id);
			if (!job) return;

			if (type === "ERROR") {
				job.reject(new Error(error));
				pendingJobs.delete(id);
			} else if (type === "INIT_DONE") {
				job.resolve();
				pendingJobs.delete(id);
			} else if (type === "PROCESS_DONE") {
				job.resolve(payload);
				pendingJobs.delete(id);
			}
		};

		const initId = jobId++;
		const initPromise = new Promise((resolve, reject) => {
			pendingJobs.set(initId, { resolve, reject });
		});

		worker.postMessage({ id: initId, type: "INIT" });
		await initPromise;
		log("ImageMagick Worker initialized.");
	} catch (err) {
		log(`Failed to initialize ImageMagick Worker: ${err.message}`, "error");
		throw err;
	}
}

/** Map MIME type to extension */
function toExtension(mime) {
	switch (mime) {
		case "image/jpeg":
			return "jpg";
		case "image/png":
			return "png";
		case "image/gif":
			return "gif";
		case "image/avif":
			return "avif";
		case "image/webp":
		default:
			return "webp";
	}
}

export async function processImage(
	file,
	{ quality, maxDimension, format, fileName },
) {
	await initCodecs();

	const bytes = await file.arrayBuffer();
	const id = jobId++;
	const ext = toExtension(format);
	const baseName = (fileName || file.name).replace(/\.[^/.]+$/, "");
	const outputName = `${baseName}.${ext}`;

	const jobPromise = new Promise((resolve, reject) => {
		pendingJobs.set(id, { resolve, reject });
	});

	worker.postMessage(
		{
			id,
			type: "PROCESS",
			payload: { bytes, quality, maxDimension, format },
		},
		[bytes],
	);

	const { data, quality: outQuality } = await jobPromise;
	const result = new File([data], outputName, {
		type: format,
		lastModified: Date.now(),
	});
	result.quality = outQuality;
	return result;
}
