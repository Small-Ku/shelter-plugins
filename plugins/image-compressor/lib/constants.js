export const Workflow = {
	DIRECT: "direct",
	REVIEW: "review",
};

export const Strategy = {
	NONE: "none",
	ONCE: "once",
	AUTO: "auto",
};

export const DEFAULTS = {
	workflow: Workflow.DIRECT,
	strategy: Strategy.AUTO,
	format: "image/webp",
	quality: 0.9,
	maxDimension: 8196,
	targetSize: 10,
	accuracy: 0.95,
};

export const processedFiles = new WeakSet();
