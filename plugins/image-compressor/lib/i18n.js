const { flux } = shelter;

const translations = {
	"en-US": {
		plugin_name: "Image Compressor",
		general_settings: "General Settings",
		upload_mode: "Upload Mode",
		upload_mode_note: "Choose how the plugin handles file uploads.",
		review_before_upload: "Review Before Upload",
		automatic_upload: "Direct Upload",
		auto_compress_trigger: "Compression Mode",
		auto_compress_trigger_note: "Select the image compression mode.",
		smart_size_limit: "Smart",
		always_compress: "Once",
		never: "Manual",
		compression_pipeline: "Compression Settings",
		engine: "Codec Engine",
		engine_note:
			"Select the codec engine. WASM is slower but provides better compression quality.",
		jsquash_wasm: "JSquash WASM",
		browser_canvas: "Browser Canvas",
		output_format: "Output Format",
		output_format_note: "The file encoding for compressed images.",
		default_params: "Default Parameters",
		comp_quality: "Compression Quality",
		comp_quality_note:
			"The target quality for the encoder. In smart mode, it will auto-adjust starting from this value.",
		max_dimension: "Max Dimension",
		max_dimension_note:
			"If the image width or height exceeds this value, it will be scaled down proportionally.",
		target_threshold: "Target File Size",
		target_threshold_note:
			"The target file size for smart mode. If the image is larger than this, quality will be adjusted until it fits.",
		convergence_accuracy: "Convergence Accuracy",
		convergence_accuracy_note:
			"The percentage of the target size to reach before stopping. Lower values are faster but may result in lower quality by stopping too early.",
		preview_select: "Select an image to preview",
		back_to_auto: "Back to Auto View",
		processing_images: "Processing images...",
		select_to_recompress: "Select a image for manual compression",
		cancel: "Cancel",
		cancel_abort: "Cancel & Abort",
		discard_all: "Discard All",
		use_optimized: "Use Compressed Version",
		manual_comp: "Manual Compression",
		oxipng_opt: "OxiPNG",
		start_manual: "Compress",
		discard_manual: "Discard Manual Tweaks",
		pass_info: "Pass {{pass}} ({{quality}}%)",
		vs_auto: "VS AUTO",
		vs_orig: "VS ORIG",
		auto_label: "Auto: ",
		orig_label: "Orig: ",
		result_label: "Result: ",
		fit: "Fit",
		toast_processed: "Processed {{count}} images",
		toast_error: "An error occurred during processing",
		jpeg: "JPEG",
		webp: "WebP",
		png: "PNG",
	},
	"zh-TW": {
		plugin_name: "圖片壓縮器",
		general_settings: "一般設定",
		upload_mode: "上傳模式",
		upload_mode_note: "選擇插件處理檔案上傳的方式。",
		review_before_upload: "上傳前預覽",
		automatic_upload: "直接上傳",
		auto_compress_trigger: "壓縮模式",
		auto_compress_trigger_note: "選擇壓縮圖片的模式。",
		smart_size_limit: "智慧",
		always_compress: "單次",
		never: "手動",
		compression_pipeline: "壓縮設定",
		engine: "編解碼引擎",
		engine_note: "選擇編解碼引擎，WASM 較慢但提供更好的壓縮品質。",
		jsquash_wasm: "JSquash WASM",
		browser_canvas: "瀏覽器 Canvas",
		output_format: "輸出格式",
		output_format_note: "壓縮圖片的輸出檔案編碼。",
		default_params: "預設參數",
		comp_quality: "壓縮品質",
		comp_quality_note: "編碼器的目標品質，智慧模式中會從此開始自動調整。",
		max_dimension: "最大寬度",
		max_dimension_note: "若圖片寬度超過此值，將會等比縮小圖片。",
		target_threshold: "目標檔案大小",
		target_threshold_note:
			"智慧模式的目標檔案大小，若圖片大於此值，將會自動調整品質直至貼近此值。",
		convergence_accuracy: "收斂精準度",
		convergence_accuracy_note:
			"目標大小的達成率百分比。智慧模式在大小達到此比例後停止嘗試。較小的值收斂較快，但可能因太早停止而導致畫質較低。",
		preview_select: "選擇圖片進行預覽",
		back_to_auto: "返回自動視圖",
		processing_images: "正在處理圖片...",
		select_to_recompress: "選擇已處理的圖片進行手動壓縮",
		cancel: "取消",
		cancel_abort: "取消並中止",
		discard_all: "全部捨棄",
		use_optimized: "使用壓縮版本",
		manual_comp: "手動壓縮",
		oxipng_opt: "OxiPNG 壓縮",
		start_manual: "開始壓縮",
		discard_manual: "捨棄手動壓縮",
		pass_info: "第 {{pass}} 輪 ({{quality}}%)",
		vs_auto: "對比自動",
		vs_orig: "對比原圖",
		auto_label: "自動: ",
		orig_label: "原圖: ",
		result_label: "結果: ",
		fit: "滿版",
		toast_processed: "已處理 {{count}} 張圖片",
		toast_error: "處理過程中發生錯誤",
		jpeg: "JPEG",
		webp: "WebP",
		png: "PNG",
	},
};

const localeMap = {
	"en-GB": "en-US",
	"zh-CN": "zh-TW",
	"zh-HK": "zh-TW",
};

let currentLocale = "en-US";

// Initialize locale synchronously if possible, or update later
const updateLocale = (locale) => {
	if (translations[locale]) {
		currentLocale = locale;
	} else if (localeMap[locale]) {
		currentLocale = localeMap[locale];
	} else if (locale?.startsWith("zh-")) {
		currentLocale = "zh-TW";
	} else if (locale?.startsWith("en-")) {
		currentLocale = "en-US";
	}
};

// Try to get current locale from Discord
const LocaleStore = flux.stores.LocaleStore;
if (LocaleStore?.locale) {
	updateLocale(LocaleStore.locale);
} else {
	flux.awaitStore("LocaleStore").then((s) => {
		if (s.locale) updateLocale(s.locale);
	});
}

export const t = (key, params = {}) => {
	let text =
		translations[currentLocale]?.[key] || translations["en-US"][key] || key;

	for (const [pKey, pVal] of Object.entries(params)) {
		text = text.replace(new RegExp(`{{${pKey}}}`, "g"), pVal);
	}

	return text;
};
