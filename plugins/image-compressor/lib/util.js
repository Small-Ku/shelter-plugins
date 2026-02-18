import { processImage } from "./codec";
import { Strategy } from "./constants";

const {
	util: { log },
} = shelter;

class QualityCurve {
	constructor() {
		this.points = [];
		this.lastSide = 0; // -1 for left, 1 for right
		this.consecutiveSideCount = 0;
	}

	add(q, size) {
		if (size <= 0 || this.points.some((p) => p.q === q)) return;
		this.points.push({ q, size });
		this.points.sort((a, b) => a.q - b.q);
	}

	predict(targetSize) {
		if (this.points.length === 0) return null;
		if (this.points.length === 1) {
			const p = this.points[0];
			const ratio = targetSize / p.size;
			const pred = Math.max(0.01, Math.min(1, p.q * ratio));
			log(`QualityCurve: Extrapolating to Q=${pred.toFixed(4)}`);
			return pred;
		}

		let left = null;
		let right = null;
		for (const p of this.points) {
			if (p.size <= targetSize) {
				if (!left || p.size > left.size) left = p;
			} else {
				if (!right || p.size < right.size) right = p;
			}
		}

		if (left && right) {
			// Illinois-Modified Regula Falsi in Log-Space
			const logL = Math.log(left.size);
			const logR = Math.log(right.size);
			const logT = Math.log(targetSize);

			// Adjust weight if one side is 'hanging' (consecutive hits)
			let leftWeight = 1.0;
			let rightWeight = 1.0;
			if (this.consecutiveSideCount >= 2) {
				if (this.lastSide === -1) rightWeight = 0.5;
				else if (this.lastSide === 1) leftWeight = 0.5;
			}

			// Using a weighted cross-multiplication for the secant
			const num =
				leftWeight * left.q * (logR - logT) +
				rightWeight * right.q * (logT - logL);
			const den = rightWeight * (logT - logL) + leftWeight * (logR - logT);

			const predicted = num / den;
			log(
				`QualityCurve: Illinois Interpolation Q=${predicted.toFixed(6)} [Side: ${this.lastSide}, Count: ${this.consecutiveSideCount}]`,
			);
			return Math.max(0.01, Math.min(1.0, predicted));
		}

		// Fallback to Global Regression
		const n = this.points.length;
		let sumX = 0,
			sumY = 0,
			sumXY = 0,
			sumXX = 0;
		for (const p of this.points) {
			const x = Math.log(p.size);
			const y = p.q;
			sumX += x;
			sumY += y;
			sumXY += x * y;
			sumXX += x * x;
		}
		const denominator = n * sumXX - sumX * sumX;
		if (Math.abs(denominator) < 1e-12) return this.points[0].q;
		const a = (n * sumXY - sumX * sumY) / denominator;
		const b = (sumY - a * sumX) / n;
		const predicted = a * Math.log(targetSize) + b;
		log(`QualityCurve: Regression Q=${predicted.toFixed(6)}`);
		return Math.max(0.01, Math.min(1.0, predicted));
	}

	updateState(newSize, targetSize) {
		const side = newSize <= targetSize ? -1 : 1;
		if (side === this.lastSide) {
			this.consecutiveSideCount++;
		} else {
			this.lastSide = side;
			this.consecutiveSideCount = 1;
		}
	}

	getPoints() {
		return [...this.points];
	}
}

export async function compressImage(
	file,
	{
		quality,
		maxDimension,
		targetMB,
		strategy,
		format,
		accuracy = 0.95,
		onPass = () => {},
	},
) {
	const targetSize = targetMB * 1024 * 1024;

	log(
		`Starting compression strategy: ${strategy} for ${file.name} (${file.size} bytes)`,
	);

	if (strategy === Strategy.NONE) return file;

	if (strategy === Strategy.ONCE) {
		const result = await processImage(file, {
			quality,
			maxDimension,
			format,
			fileName: file.name,
		});
		onPass(1, quality, result, [{ q: quality, size: result.size }]);
		return result;
	}

	// AUTO STRATEGY
	let lastProcessedFile = file;
	let pass = 1;
	let lastUpdateTime = 0;
	const UPDATE_INTERVAL = 300; // ms

	const curve = new QualityCurve();

	let lowQ = 0.3;
	let highQ = quality;

	const seenSizes = new Set();
	const seenQualities = new Set();
	const MAX_PASSES = 12;
	log(`Target size: ${targetSize} bytes (${targetMB} MB)`);

	while (pass <= MAX_PASSES) {
		let currentQuality;
		let predicted = null;
		if (pass === 1) {
			currentQuality = highQ;
		} else {
			predicted = curve.predict(targetSize);
			if (predicted === null) {
				currentQuality = (lowQ + highQ) / 2;
			} else {
				// CLAMP prediction to known bounds to ensure we don't repeat failed ranges
				currentQuality = Math.max(lowQ, Math.min(highQ, predicted));

				// If the prediction is stuck at a bound, move towards the center/other bound
				if (Math.abs(currentQuality - lowQ) < 0.0001 && lowQ < highQ) {
					currentQuality = (lowQ + highQ) / 2;
				}
			}
		}

		// Discretize to 1/100th steps (integer qualities)
		let effectiveQ = Math.round(currentQuality * 100) / 100;

		// Ensure we don't repeat the same discrete quality
		if (seenQualities.has(effectiveQ)) {
			// Find next untried discrete step towards the likely target
			const direction = (predicted ?? 1.0) > effectiveQ ? 0.01 : -0.01;
			effectiveQ = Math.round((effectiveQ + direction) * 100) / 100;
		}

		// Final guardrails for search range
		effectiveQ = Math.max(0.01, Math.min(1.0, effectiveQ));
		if (pass > 1) {
			effectiveQ = Math.max(
				Math.round(lowQ * 100) / 100,
				Math.min(Math.round(highQ * 100) / 100, effectiveQ),
			);
		}

		log(
			`Pass ${pass}: Q=${effectiveQ.toFixed(2)} ([${lowQ.toFixed(3)}, ${highQ.toFixed(3)}])`,
		);

		const resultFile = await processImage(file, {
			quality: effectiveQ,
			maxDimension,
			format,
			fileName: file.name,
		});

		log(
			`Pass ${pass} result: ${resultFile.size} bytes (${resultFile.type}) (Target: ${targetSize})`,
		);

		if (seenSizes.has(resultFile.size)) {
			const isFarFromTarget =
				Math.abs(resultFile.size - targetSize) > targetSize * (1 - accuracy);
			const isUnderTarget = resultFile.size < targetSize;

			if (
				isFarFromTarget &&
				isUnderTarget &&
				effectiveQ < 0.999 &&
				highQ - lowQ > 0.005
			) {
				log(
					`Size plateau reached at ${resultFile.size} bytes, but still far from target. Pushing quality bounds up.`,
				);
				// Force the lower bound past the current failed quality
				lowQ = Math.min(effectiveQ + 0.001, 1.0);
				// Ensure highQ is still strictly above lowQ if possible
				if (highQ <= lowQ + 0.001) highQ = Math.min(lowQ + 0.1, 1.0);
			} else {
				log(`Size plateau reached at ${resultFile.size} bytes, stopping.`);
				break;
			}
		}
		seenQualities.add(effectiveQ);
		seenSizes.add(resultFile.size);
		curve.add(effectiveQ, resultFile.size);
		curve.updateState(resultFile.size, targetSize);

		const now = Date.now();
		if (
			now - lastUpdateTime > UPDATE_INTERVAL ||
			resultFile.size <= targetSize ||
			pass === MAX_PASSES
		) {
			onPass(pass, effectiveQ, resultFile, curve.getPoints());
			lastUpdateTime = now;
		}

		if (resultFile.size <= targetSize) {
			if (
				lastProcessedFile === file ||
				lastProcessedFile.size > targetSize ||
				resultFile.size > lastProcessedFile.size
			) {
				lastProcessedFile = resultFile;
			}
			lowQ = Math.max(lowQ, effectiveQ);

			if (resultFile.size > targetSize * accuracy) {
				log(
					`Target reached accurately enough: ${resultFile.size} > ${targetSize * accuracy}`,
				);
				break;
			}

			if (pass === 1) {
				log("First pass under target, expanding search range to Q=1.0");
				highQ = 1.0;
			}
		} else {
			if (
				lastProcessedFile === file ||
				(resultFile.size < lastProcessedFile.size &&
					lastProcessedFile.size > targetSize)
			) {
				lastProcessedFile = resultFile;
			}
			highQ = Math.min(highQ, effectiveQ);
		}

		if (Math.round(highQ * 100) <= Math.round(lowQ * 100)) {
			log(
				`Quality range converged (discrete): ${Math.round(lowQ * 100)} == ${Math.round(highQ * 100)}`,
			);
			break;
		}
		pass++;
	}

	log(
		`Final size: ${lastProcessedFile.size} after ${pass - 1} passes. Final quality: ${lastProcessedFile.quality ?? "N/A"}`,
	);
	return lastProcessedFile;
}

export function getLimit() {
	const UserStore = shelter.flux.storesFlat.UserStore;
	const user = UserStore?.getCurrentUser();
	return user?.premiumType === 2 ? 1000 * 1024 * 1024 : 10 * 1024 * 1024;
}
