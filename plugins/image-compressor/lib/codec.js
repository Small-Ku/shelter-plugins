import { Engine } from "./constants";
import { createWorkerCode } from "./worker";

// Dynamic imports for JSquash
let jpeg, png, webp, resize, oxipng;
let worker;
const workerPromises = new Map();
let nextRequestId = 0;

const {
	util: { log },
} = shelter;

export async function initCodecs() {
	// If the worker is running, we don't need to load main-thread WASM codecs
	if (jpeg || worker) return;

	try {
		log(
			"Worker unavailable, loading JSquash codecs on main thread fallback...",
		);
		[jpeg, png, webp, resize, oxipng] = await Promise.all([
			import("https://esm.sh/@jsquash/jpeg@1.6.0"),
			import("https://esm.sh/@jsquash/png@3.1.1"),
			import("https://esm.sh/@jsquash/webp@1.5.0"),
			import("https://esm.sh/@jsquash/resize@2.1.1"),
			import("https://esm.sh/@jsquash/oxipng@2.3.0"),
		]);
		log("Main-thread JSquash codecs loaded successfully.");
	} catch (e) {
		log(
			`Failed to load main-thread codecs: ${e}. Falling back to Canvas.`,
			"error",
		);
	}
}

export function initWorker() {
	if (worker) return;
	try {
		const blob = new Blob([createWorkerCode()], {
			type: "application/javascript",
		});
		const url = URL.createObjectURL(blob);
		worker = new Worker(url);
		worker.onmessage = (e) => {
			const { id, success, buffer, error } = e.data;
			const resolver = workerPromises.get(id);
			if (resolver) {
				if (success) resolver.resolve(buffer);
				else resolver.reject(new Error(error));
				workerPromises.delete(id);
			}
		};
		log("Compression worker initialized.");
	} catch (e) {
		log(`Failed to init worker, will fallback to main thread: ${e}`, "warn");
	}
}

async function requestWorkerEncode(imageData, options) {
	if (!worker) throw new Error("Worker not initialized");
	const id = nextRequestId++;
	return new Promise((resolve, reject) => {
		workerPromises.set(id, { resolve, reject });
		worker.postMessage({ id, imageData, options }, [imageData.data.buffer]);
	});
}

export async function fileToImageData(file) {
	// Use Canvas for decoding as it's often more compatible for simple img tags
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);
			resolve(ctx.getImageData(0, 0, img.width, img.height));
			URL.revokeObjectURL(img.src);
		};
		img.onerror = (e) => {
			URL.revokeObjectURL(img.src);
			reject(new Error(`Failed to decode image: ${e}`));
		};
		img.src = URL.createObjectURL(file);
	});
}

async function compressWithCanvas(imageData, { quality, format }) {
	return new Promise((resolve) => {
		const canvas = document.createElement("canvas");
		canvas.width = imageData.width;
		canvas.height = imageData.height;
		const ctx = canvas.getContext("2d");
		ctx.putImageData(imageData, 0, 0);

		canvas.toBlob(
			(blob) => {
				resolve(blob.arrayBuffer());
			},
			format,
			quality,
		);
	});
}

export async function processImage(
	source, // Can be File or ImageData
	{
		quality = 0.8,
		maxDimension = 2048,
		format = "image/jpeg",
		engine = Engine.JSQUASH,
		useOxipng = true,
		fileName = "image.jpg",
	},
) {
	// 1. Try Worker Path (Zero main-thread blocking)
	if (engine === Engine.JSQUASH && worker) {
		try {
			const imageData =
				source instanceof File ? await fileToImageData(source) : source;
			const outputBuffer = await requestWorkerEncode(imageData, {
				quality,
				format,
				useOxipng,
				maxDimension,
			});

			const extension = format.split("/")[1];
			const processedName =
				(source instanceof File ? source.name : fileName).replace(
					/\.[^/.]+$/,
					"",
				) +
				"." +
				(extension === "jpeg" ? "jpg" : extension);

			const result = new File([outputBuffer], processedName, {
				type: format,
				lastModified: Date.now(),
			});
			// Attach metadata for usage in logs/UI
			result.quality = quality;
			result.width = imageData.width;
			result.height = imageData.height;
			return result;
		} catch (e) {
			log(`Worker processing failed: ${e}. Falling back...`, "warn");
		}
	}

	// 2. Main-thread Fallback
	if (engine === Engine.JSQUASH) {
		await initCodecs();
		if (!jpeg) engine = Engine.CANVAS;
	}

	let imageData =
		source instanceof File ? await fileToImageData(source) : source;

	// Resize if needed (Main-thread)
	if (imageData.width > maxDimension || imageData.height > maxDimension) {
		let width = imageData.width;
		let height = imageData.height;

		if (width > height) {
			height = Math.round(height * (maxDimension / width));
			width = maxDimension;
		} else {
			width = Math.round(width * (maxDimension / height));
			height = maxDimension;
		}

		if (engine === Engine.JSQUASH && resize) {
			imageData = await resize.default(imageData, { width, height });
		} else {
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			const tempCanvas = document.createElement("canvas");
			tempCanvas.width = imageData.width;
			tempCanvas.height = imageData.height;
			tempCanvas.getContext("2d").putImageData(imageData, 0, 0);
			ctx.drawImage(tempCanvas, 0, 0, width, height);
			imageData = ctx.getImageData(0, 0, width, height);
		}
	}

	let outputBuffer;
	let outputType = format;

	if (engine === Engine.CANVAS) {
		outputBuffer = await compressWithCanvas(imageData, { quality, format });
	} else {
		// JSquash Fallback Path
		try {
			if (format === "image/webp" && webp) {
				outputBuffer = await webp.encode(imageData, { quality: quality * 100 });
			} else if (format === "image/png" && png) {
				outputBuffer = await png.encode(imageData);
				if (useOxipng && oxipng)
					outputBuffer = await oxipng.optimise(outputBuffer);
			} else if (jpeg) {
				outputBuffer = await jpeg.encode(imageData, { quality: quality * 100 });
				outputType = "image/jpeg";
			}
		} catch (e) {
			log(`Main-thread fallback encoding failed: ${e}. Using Canvas.`, "error");
			outputBuffer = await compressWithCanvas(imageData, { quality, format });
			outputType = format;
		}
	}

	const extension = outputType.split("/")[1];
	const processedName =
		(source instanceof File ? source.name : fileName).replace(/\.[^/.]+$/, "") +
		"." +
		(extension === "jpeg" ? "jpg" : extension);

	const result = new File([outputBuffer], processedName, {
		type: outputType,
		lastModified: Date.now(),
	});
	result.quality = quality;
	result.width = imageData.width;
	result.height = imageData.height;
	return result;
}
