(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region plugins/image-compressor/lib/i18n.js
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
		output_format: "Output Format",
		output_format_note: "The file encoding for compressed images.",
		default_params: "Default Parameters",
		comp_quality: "Compression Quality",
		comp_quality_note: "The target quality for the encoder. In smart mode, it will auto-adjust starting from this value.",
		max_dimension: "Max Dimension",
		max_dimension_note: "If the image width or height exceeds this value, it will be scaled down proportionally.",
		target_threshold: "Target File Size",
		target_threshold_note: "The target file size for smart mode. If the image is larger than this, quality will be adjusted until it fits.",
		convergence_accuracy: "Convergence Accuracy",
		convergence_accuracy_note: "The percentage of the target size to reach before stopping. Lower values are faster but may result in lower quality by stopping too early.",
		preview_select: "Select an image to preview",
		back_to_auto: "Back to Auto View",
		processing_images: "Processing images...",
		select_to_recompress: "Select a image for manual compression",
		cancel: "Cancel",
		cancel_abort: "Cancel & Abort",
		discard_all: "Discard All",
		use_optimized: "Use Compressed Version",
		manual_comp: "Manual Compression",
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
		gif: "GIF",
		avif: "AVIF"
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
		output_format: "輸出格式",
		output_format_note: "壓縮圖片的輸出檔案編碼。",
		default_params: "預設參數",
		comp_quality: "壓縮品質",
		comp_quality_note: "編碼器的目標品質，智慧模式中會從此開始自動調整。",
		max_dimension: "最大寬度",
		max_dimension_note: "若圖片寬度超過此值，將會等比縮小圖片。",
		target_threshold: "目標檔案大小",
		target_threshold_note: "智慧模式的目標檔案大小，若圖片大於此值，將會自動調整品質直至貼近此值。",
		convergence_accuracy: "收斂精準度",
		convergence_accuracy_note: "目標大小的達成率百分比。智慧模式在大小達到此比例後停止嘗試。較小的值收斂較快，但可能因太早停止而導致畫質較低。",
		preview_select: "選擇圖片進行預覽",
		back_to_auto: "返回自動視圖",
		processing_images: "正在處理圖片...",
		select_to_recompress: "選擇已處理的圖片進行手動壓縮",
		cancel: "取消",
		cancel_abort: "取消並中止",
		discard_all: "全部捨棄",
		use_optimized: "使用壓縮版本",
		manual_comp: "手動壓縮",
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
		gif: "GIF",
		avif: "AVIF"
	}
};
const localeMap = {
	"en-GB": "en-US",
	"zh-CN": "zh-TW",
	"zh-HK": "zh-TW"
};
let currentLocale = "en-US";
const updateLocale = (locale) => {
	if (translations[locale]) currentLocale = locale;
else if (localeMap[locale]) currentLocale = localeMap[locale];
else if (locale?.startsWith("zh-")) currentLocale = "zh-TW";
else if (locale?.startsWith("en-")) currentLocale = "en-US";
};
const LocaleStore = flux.stores.LocaleStore;
if (LocaleStore?.locale) updateLocale(LocaleStore.locale);
else flux.awaitStore("LocaleStore").then((s) => {
	if (s.locale) updateLocale(s.locale);
});
const t = (key, params = {}) => {
	let text = translations[currentLocale]?.[key] || translations["en-US"][key] || key;
	for (const [pKey, pVal] of Object.entries(params)) text = text.replace(new RegExp(`{{${pKey}}}`, "g"), pVal);
	return text;
};

//#endregion
//#region plugins/image-compressor/components/ComparisonView.jsx
var import_web$40 = __toESM(require_web(), 1);
var import_web$41 = __toESM(require_web(), 1);
var import_web$42 = __toESM(require_web(), 1);
var import_web$43 = __toESM(require_web(), 1);
var import_web$44 = __toESM(require_web(), 1);
var import_web$45 = __toESM(require_web(), 1);
var import_web$46 = __toESM(require_web(), 1);
var import_web$47 = __toESM(require_web(), 1);
var import_web$48 = __toESM(require_web(), 1);
var import_web$49 = __toESM(require_web(), 1);
var import_web$50 = __toESM(require_web(), 1);
var import_web$51 = __toESM(require_web(), 1);
const _tmpl$$4 = /*#__PURE__*/ (0, import_web$40.template)(`<img alt="">`, 1), _tmpl$2$4 = /*#__PURE__*/ (0, import_web$40.template)(`<div></div>`, 2), _tmpl$3$3 = /*#__PURE__*/ (0, import_web$40.template)(`<button type="button"></button>`, 2), _tmpl$4$2 = /*#__PURE__*/ (0, import_web$40.template)(`<div><div><div><div></div></div><div><div></div></div><div></div><!#><!/><div><div><!#><!/><span><!#><!/><!#><!/></span></div><div><span><!#><!/>%</span><input type="range" min="0.05" max="5" step="0.01"><button type="button">1:1</button><button type="button"></button></div><div><!#><!/> <!#><!/> (-<!#><!/>%)</div></div></div></div>`, 47);
const { solid: { createSignal: createSignal$2, onMount, onCleanup, createMemo: createMemo$1, Show: Show$3, createEffect: createEffect$1 } } = shelter;
const ComparisonView = (props) => {
	let containerRef;
	let resizeObserver;
	const [targetZoom, setTargetZoom] = createSignal$2(1);
	const [targetOffset, setTargetOffset] = createSignal$2({
		x: 0,
		y: 0
	});
	let currentZoom = 1;
	const currentOffset = {
		x: 0,
		y: 0
	};
	const [isPanning, setIsPanning] = createSignal$2(false);
	const [imageSize, setImageSize] = createSignal$2({
		w: 0,
		h: 0
	});
	const [sliderPos, setSliderPos] = createSignal$2(50);
	const [isAnimating, setIsAnimating] = createSignal$2(false);
	const [containerSize, setContainerSize] = createSignal$2({
		w: 0,
		h: 0
	});
	let lastImageKey = null;
	const formatSize = (bytes) => {
		if (!bytes) return "0 B";
		const k = 1024;
		const sizes = [
			"B",
			"KB",
			"MB",
			"GB",
			"TB"
		];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + (sizes[i] || "B");
	};
	const fitZoom = createMemo$1(() => {
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
	const updateZoom = (newZoom, origin = {
		x: 0,
		y: 0
	}) => {
		const oldZoom = targetZoom();
		if (newZoom === oldZoom) {
			setTargetOffset((prev) => getConstrainedOffset(newZoom, prev));
			return;
		}
		setTargetZoom(newZoom);
		setTargetOffset((prev) => {
			const ratio = newZoom / oldZoom;
			const nextX = origin.x - (origin.x - prev.x) * ratio;
			const nextY = origin.y - (origin.y - prev.y) * ratio;
			return getConstrainedOffset(newZoom, {
				x: nextX,
				y: nextY
			});
		});
	};
	let innerOriginalRef;
	let innerCompressedRef;
	let originalWrapperRef;
	let splitLineRef;
	const applyTransform = () => {
		const transform = `translate(calc(-50% + ${currentOffset.x}px), calc(-50% + ${currentOffset.y}px)) scale(${currentZoom})`;
		if (innerOriginalRef) innerOriginalRef.style.transform = transform;
		if (innerCompressedRef) innerCompressedRef.style.transform = transform;
		if (originalWrapperRef) originalWrapperRef.style.clipPath = `inset(0 ${100 - sliderPos()}% 0 0)`;
		if (splitLineRef) splitLineRef.style.left = `${sliderPos()}%`;
	};
	let rafId;
	const animate = () => {
		const tZ = targetZoom();
		const tO = targetOffset();
		currentZoom += (tZ - currentZoom) * .25;
		currentOffset.x += (tO.x - currentOffset.x) * .25;
		currentOffset.y += (tO.y - currentOffset.y) * .25;
		if (Math.abs(tZ - currentZoom) < .001) currentZoom = tZ;
		if (Math.abs(tO.x - currentOffset.x) < .1) currentOffset.x = tO.x;
		if (Math.abs(tO.y - currentOffset.y) < .1) currentOffset.y = tO.y;
		applyTransform();
		if (currentZoom !== tZ || currentOffset.x !== tO.x || currentOffset.y !== tO.y) {
			rafId = requestAnimationFrame(animate);
			setIsAnimating(true);
		} else {
			setIsAnimating(false);
			rafId = null;
		}
	};
	createEffect$1(() => {
		targetZoom();
		targetOffset();
		if (!rafId) rafId = requestAnimationFrame(animate);
	});
	createEffect$1(() => {
		sliderPos();
		if (!isAnimating()) applyTransform();
	});
	const [imgs, setImgs] = createSignal$2({
		original: props.originalUrl,
		compressed: props.compressedUrl
	});
	createEffect$1(() => {
		const orig = props.originalUrl;
		const comp = props.compressedUrl;
		const key = props.imageKey;
		if (key !== lastImageKey) {
			setImgs({
				original: "",
				compressed: ""
			});
			const timer = setTimeout(() => {
				setImgs({
					original: orig,
					compressed: comp
				});
			}, 40);
			onCleanup(() => clearTimeout(timer));
		} else setImgs((prev) => ({
			...prev,
			compressed: comp,
			original: orig
		}));
	});
	const onImageLoad = (e) => {
		const img = e.target;
		if (img.naturalWidth === 0) return;
		setImageSize({
			w: img.naturalWidth,
			h: img.naturalHeight
		});
		const key = props.imageKey;
		if (key !== lastImageKey) {
			const fit = fitZoom();
			setTargetZoom(fit);
			currentZoom = fit;
			setTargetOffset({
				x: 0,
				y: 0
			});
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
			setTargetOffset({
				x: currentOffset.x,
				y: currentOffset.y
			});
			applyTransform();
		} else {
			const rect = containerRef.getBoundingClientRect();
			const x = Math.max(0, Math.min(100, (e.clientX - rect.left) / rect.width * 100));
			setSliderPos(x);
		}
	};
	onMount(() => {
		window.addEventListener("mouseup", handleMouseUp);
		if (containerRef) {
			resizeObserver = new ResizeObserver(() => {
				setContainerSize({
					w: containerRef.clientWidth,
					h: containerRef.clientHeight
				});
				const zoom = targetZoom();
				setTargetOffset((prev) => getConstrainedOffset(zoom, prev));
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
	const displayZoomPercent = createMemo$1(() => Math.round(targetZoom() * 100));
	const layerStyle = {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		overflow: "hidden"
	};
	const innerStyle = {
		position: "absolute",
		top: "50%",
		left: "50%",
		"transform-origin": "center",
		display: "block",
		"pointer-events": "none"
	};
	const imgStyle = {
		display: "block",
		"user-select": "none",
		"-webkit-user-drag": "none"
	};
	return (() => {
		const _el$ = (0, import_web$49.getNextElement)(_tmpl$4$2), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$6 = _el$3.nextSibling, _el$7 = _el$6.firstChild, _el$9 = _el$6.nextSibling, _el$37 = _el$9.nextSibling, [_el$38, _co$8] = (0, import_web$42.getNextMarker)(_el$37.nextSibling), _el$1 = _el$38.nextSibling, _el$10 = _el$1.firstChild, _el$17 = _el$10.firstChild, [_el$18, _co$3] = (0, import_web$42.getNextMarker)(_el$17.nextSibling), _el$12 = _el$18.nextSibling, _el$13 = _el$12.firstChild, [_el$14, _co$] = (0, import_web$42.getNextMarker)(_el$13.nextSibling), _el$15 = _el$14.nextSibling, [_el$16, _co$2] = (0, import_web$42.getNextMarker)(_el$15.nextSibling), _el$19 = _el$10.nextSibling, _el$20 = _el$19.firstChild, _el$22 = _el$20.firstChild, [_el$23, _co$4] = (0, import_web$42.getNextMarker)(_el$22.nextSibling), _el$21 = _el$23.nextSibling, _el$24 = _el$20.nextSibling, _el$25 = _el$24.nextSibling, _el$26 = _el$25.nextSibling, _el$27 = _el$19.nextSibling, _el$31 = _el$27.firstChild, [_el$32, _co$5] = (0, import_web$42.getNextMarker)(_el$31.nextSibling), _el$28 = _el$32.nextSibling, _el$33 = _el$28.nextSibling, [_el$34, _co$6] = (0, import_web$42.getNextMarker)(_el$33.nextSibling), _el$29 = _el$34.nextSibling, _el$35 = _el$29.nextSibling, [_el$36, _co$7] = (0, import_web$42.getNextMarker)(_el$35.nextSibling), _el$30 = _el$36.nextSibling;
		_el$.style.setProperty("display", "flex");
		_el$.style.setProperty("flex-direction", "column");
		_el$.style.setProperty("gap", "8px");
		_el$2.addEventListener("wheel", (e) => {
			e.preventDefault();
			const rect = containerRef.getBoundingClientRect();
			const origin = {
				x: e.clientX - rect.left - rect.width / 2,
				y: e.clientY - rect.top - rect.height / 2
			};
			const delta = e.deltaY > 0 ? .85 : 1.15;
			const newZoom = Math.min(Math.max(targetZoom() * delta, fitZoom() * .5), 15);
			updateZoom(newZoom, origin);
		});
		_el$2.addEventListener("mouseleave", () => setIsPanning(false));
		_el$2.$$mousemove = handleMouseMove;
		_el$2.$$mousedown = handleMouseDown;
		const _ref$ = containerRef;
		typeof _ref$ === "function" ? (0, import_web$51.use)(_ref$, _el$2) : containerRef = _el$2;
		_el$2.style.setProperty("position", "relative");
		_el$2.style.setProperty("width", "100%");
		_el$2.style.setProperty("height", "360px");
		_el$2.style.setProperty("background", "#16171a");
		_el$2.style.setProperty("border-radius", "8px");
		_el$2.style.setProperty("overflow", "hidden");
		_el$2.style.setProperty("border", "1px solid rgba(255,255,255,0.05)");
		_el$2.style.setProperty("user-select", "none");
		const _ref$2 = innerCompressedRef;
		typeof _ref$2 === "function" ? (0, import_web$51.use)(_ref$2, _el$4) : innerCompressedRef = _el$4;
		(0, import_web$45.insert)(_el$4, (0, import_web$46.createComponent)(Show$3, {
			get when() {
				return imgs().compressed;
			},
			get children() {
				const _el$5 = (0, import_web$49.getNextElement)(_tmpl$$4);
				_el$5.addEventListener("load", onImageLoad);
				(0, import_web$50.setAttribute)(_el$5, "draggable", false);
				(0, import_web$48.effect)((_p$) => {
					const _v$ = imgs().compressed, _v$2 = imgStyle;
					_v$ !== _p$._v$ && (0, import_web$50.setAttribute)(_el$5, "src", _p$._v$ = _v$);
					_p$._v$2 = (0, import_web$47.style)(_el$5, _v$2, _p$._v$2);
					return _p$;
				}, {
					_v$: undefined,
					_v$2: undefined
				});
				return _el$5;
			}
		}));
		const _ref$3 = originalWrapperRef;
		typeof _ref$3 === "function" ? (0, import_web$51.use)(_ref$3, _el$6) : originalWrapperRef = _el$6;
		const _ref$4 = innerOriginalRef;
		typeof _ref$4 === "function" ? (0, import_web$51.use)(_ref$4, _el$7) : innerOriginalRef = _el$7;
		(0, import_web$45.insert)(_el$7, (0, import_web$46.createComponent)(Show$3, {
			get when() {
				return imgs().original;
			},
			get children() {
				const _el$8 = (0, import_web$49.getNextElement)(_tmpl$$4);
				_el$8.addEventListener("load", onImageLoad);
				(0, import_web$50.setAttribute)(_el$8, "draggable", false);
				(0, import_web$48.effect)((_p$) => {
					const _v$3 = imgs().original, _v$4 = imgStyle;
					_v$3 !== _p$._v$3 && (0, import_web$50.setAttribute)(_el$8, "src", _p$._v$3 = _v$3);
					_p$._v$4 = (0, import_web$47.style)(_el$8, _v$4, _p$._v$4);
					return _p$;
				}, {
					_v$3: undefined,
					_v$4: undefined
				});
				return _el$8;
			}
		}));
		const _ref$5 = splitLineRef;
		typeof _ref$5 === "function" ? (0, import_web$51.use)(_ref$5, _el$9) : splitLineRef = _el$9;
		_el$9.style.setProperty("position", "absolute");
		_el$9.style.setProperty("top", "0");
		_el$9.style.setProperty("bottom", "0");
		_el$9.style.setProperty("width", "2px");
		_el$9.style.setProperty("background", "rgba(255,255,255,0.9)");
		_el$9.style.setProperty("box-shadow", "0 0 4px rgba(0,0,0,0.5)");
		_el$9.style.setProperty("pointer-events", "none");
		_el$9.style.setProperty("z-index", "2");
		_el$9.style.setProperty("transform", "translateX(-50%)");
		(0, import_web$45.insert)(_el$2, (0, import_web$46.createComponent)(Show$3, {
			get when() {
				return props.metadata;
			},
			get children() {
				const _el$0 = (0, import_web$49.getNextElement)(_tmpl$2$4);
				_el$0.style.setProperty("position", "absolute");
				_el$0.style.setProperty("top", "8px");
				_el$0.style.setProperty("left", "50%");
				_el$0.style.setProperty("transform", "translateX(-50%)");
				_el$0.style.setProperty("background", "rgba(88, 101, 242, 0.9)");
				_el$0.style.setProperty("padding", "4px 8px");
				_el$0.style.setProperty("border-radius", "4px");
				_el$0.style.setProperty("font-size", "10px");
				_el$0.style.setProperty("color", "white");
				_el$0.style.setProperty("pointer-events", "none");
				_el$0.style.setProperty("backdrop-filter", "blur(4px)");
				_el$0.style.setProperty("z-index", "3");
				(0, import_web$45.insert)(_el$0, () => t("pass_info", {
					pass: props.metadata.pass,
					quality: Math.round(props.metadata.quality * 100)
				}));
				return _el$0;
			}
		}), _el$38, _co$8);
		_el$1.style.setProperty("position", "absolute");
		_el$1.style.setProperty("bottom", "8px");
		_el$1.style.setProperty("left", "8px");
		_el$1.style.setProperty("right", "8px");
		_el$1.style.setProperty("display", "flex");
		_el$1.style.setProperty("justify-content", "space-between");
		_el$1.style.setProperty("align-items", "center");
		_el$1.style.setProperty("pointer-events", "none");
		_el$1.style.setProperty("z-index", "3");
		_el$10.style.setProperty("display", "flex");
		_el$10.style.setProperty("align-items", "center");
		_el$10.style.setProperty("gap", "4px");
		_el$10.style.setProperty("background", "rgba(0,0,0,0.7)");
		_el$10.style.setProperty("padding", "0 6px");
		_el$10.style.setProperty("height", "20px");
		_el$10.style.setProperty("border-radius", "4px");
		_el$10.style.setProperty("pointer-events", "auto");
		(0, import_web$45.insert)(_el$10, (0, import_web$46.createComponent)(Show$3, {
			get when() {
				return props.hasAutoResult && props.isManual;
			},
			get children() {
				const _el$11 = (0, import_web$49.getNextElement)(_tmpl$3$3);
				_el$11.$$click = () => props.setReferenceType((prev) => prev === "original" ? "auto" : "original");
				_el$11.style.setProperty("border", "none");
				_el$11.style.setProperty("color", "white");
				_el$11.style.setProperty("font-size", "9px");
				_el$11.style.setProperty("border-radius", "3px");
				_el$11.style.setProperty("padding", "1px 4px");
				_el$11.style.setProperty("cursor", "pointer");
				_el$11.style.setProperty("margin-right", "4px");
				_el$11.style.setProperty("font-weight", "600");
				(0, import_web$45.insert)(_el$11, (() => {
					const _c$ = (0, import_web$44.memo)(() => props.referenceType() === "auto");
					return () => _c$() ? t("vs_orig") : t("vs_auto");
				})());
				(0, import_web$48.effect)(() => _el$11.style.setProperty("background", props.referenceType() === "auto" ? "var(--brand-experiment)" : "rgba(255,255,255,0.1)"));
				(0, import_web$43.runHydrationEvents)();
				return _el$11;
			}
		}), _el$18, _co$3);
		_el$12.style.setProperty("font-size", "10px");
		_el$12.style.setProperty("color", "white");
		_el$12.style.setProperty("font-weight", "600");
		(0, import_web$45.insert)(_el$12, (() => {
			const _c$2 = (0, import_web$44.memo)(() => props.referenceType() === "auto");
			return () => _c$2() ? t("auto_label") : t("orig_label");
		})(), _el$14, _co$);
		(0, import_web$45.insert)(_el$12, () => formatSize(props.originalSize), _el$16, _co$2);
		_el$19.style.setProperty("display", "flex");
		_el$19.style.setProperty("align-items", "center");
		_el$19.style.setProperty("gap", "6px");
		_el$19.style.setProperty("background", "rgba(0,0,0,0.7)");
		_el$19.style.setProperty("padding", "0 6px");
		_el$19.style.setProperty("height", "20px");
		_el$19.style.setProperty("border-radius", "4px");
		_el$19.style.setProperty("pointer-events", "auto");
		_el$20.style.setProperty("font-size", "10px");
		_el$20.style.setProperty("color", "white");
		_el$20.style.setProperty("font-weight", "600");
		_el$20.style.setProperty("text-align", "right");
		(0, import_web$45.insert)(_el$20, displayZoomPercent, _el$23, _co$4);
		_el$24.$$input = (e) => updateZoom(parseFloat(e.target.value));
		_el$24.style.setProperty("width", "80px");
		_el$24.style.setProperty("height", "4px");
		_el$24.style.setProperty("-webkit-appearance", "none");
		_el$24.style.setProperty("background", "rgba(255,255,255,0.2)");
		_el$24.style.setProperty("border-radius", "2px");
		_el$24.style.setProperty("outline", "none");
		_el$25.$$click = () => updateZoom(1);
		_el$25.style.setProperty("background", "transparent");
		_el$25.style.setProperty("border", "1px solid rgba(255,255,255,0.2)");
		_el$25.style.setProperty("color", "white");
		_el$25.style.setProperty("font-size", "9px");
		_el$25.style.setProperty("border-radius", "3px");
		_el$25.style.setProperty("padding", "1px 4px");
		_el$25.style.setProperty("cursor", "pointer");
		_el$26.$$click = () => {
			setTargetZoom(fitZoom());
			setTargetOffset({
				x: 0,
				y: 0
			});
		};
		_el$26.style.setProperty("background", "transparent");
		_el$26.style.setProperty("border", "1px solid rgba(255,255,255,0.2)");
		_el$26.style.setProperty("color", "white");
		_el$26.style.setProperty("font-size", "9px");
		_el$26.style.setProperty("border-radius", "3px");
		_el$26.style.setProperty("padding", "1px 4px");
		_el$26.style.setProperty("cursor", "pointer");
		(0, import_web$45.insert)(_el$26, () => t("fit"));
		_el$27.style.setProperty("background", "rgba(0,0,0,0.7)");
		_el$27.style.setProperty("padding", "0 6px");
		_el$27.style.setProperty("height", "20px");
		_el$27.style.setProperty("border-radius", "4px");
		_el$27.style.setProperty("font-size", "10px");
		_el$27.style.setProperty("color", "white");
		_el$27.style.setProperty("font-weight", "600");
		_el$27.style.setProperty("pointer-events", "auto");
		(0, import_web$45.insert)(_el$27, () => t("result_label"), _el$32, _co$5);
		(0, import_web$45.insert)(_el$27, () => formatSize(props.compressedSize), _el$34, _co$6);
		(0, import_web$45.insert)(_el$27, () => Math.round((1 - (props.compressedSize / props.originalSize || 0)) * 100), _el$36, _co$7);
		(0, import_web$48.effect)((_p$) => {
			const _v$5 = isPanning() ? "grabbing" : "crosshair", _v$6 = layerStyle, _v$7 = innerStyle, _v$8 = {
				...layerStyle,
				"z-index": 1
			}, _v$9 = innerStyle;
			_v$5 !== _p$._v$5 && _el$2.style.setProperty("cursor", _p$._v$5 = _v$5);
			_p$._v$6 = (0, import_web$47.style)(_el$3, _v$6, _p$._v$6);
			_p$._v$7 = (0, import_web$47.style)(_el$4, _v$7, _p$._v$7);
			_p$._v$8 = (0, import_web$47.style)(_el$6, _v$8, _p$._v$8);
			_p$._v$9 = (0, import_web$47.style)(_el$7, _v$9, _p$._v$9);
			return _p$;
		}, {
			_v$5: undefined,
			_v$6: undefined,
			_v$7: undefined,
			_v$8: undefined,
			_v$9: undefined
		});
		(0, import_web$48.effect)(() => _el$24.value = targetZoom());
		(0, import_web$43.runHydrationEvents)();
		return _el$;
	})();
};
(0, import_web$41.delegateEvents)([
	"mousedown",
	"mousemove",
	"click",
	"input"
]);

//#endregion
//#region plugins/image-compressor/components/CompressionQueue.jsx
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
var import_web$31 = __toESM(require_web(), 1);
var import_web$32 = __toESM(require_web(), 1);
var import_web$33 = __toESM(require_web(), 1);
var import_web$34 = __toESM(require_web(), 1);
var import_web$35 = __toESM(require_web(), 1);
var import_web$36 = __toESM(require_web(), 1);
var import_web$37 = __toESM(require_web(), 1);
var import_web$38 = __toESM(require_web(), 1);
var import_web$39 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$29.template)(`<div><div></div><style>
                .queue-item:hover { filter: brightness(1.1); transform: translateY(-1px); }
                .queue-item:active { transform: translateY(0) scale(0.98); }
            </style></div>`, 6), _tmpl$2$3 = /*#__PURE__*/ (0, import_web$29.template)(`<img>`, 1), _tmpl$3$2 = /*#__PURE__*/ (0, import_web$29.template)(`<div>-<!#><!/>%</div>`, 4), _tmpl$4$1 = /*#__PURE__*/ (0, import_web$29.template)(`<button type="button" class="queue-item"><!#><!/><div></div><!#><!/></button>`, 8);
const { solid: { For: For$1, Show: Show$2 } } = shelter;
const CompressionQueue = (props) => {
	const { queue, inspectedIndex, setInspectedIndex } = props;
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
		overflow: "hidden",
		marginTop: "auto"
	};
	return (() => {
		const _el$ = (0, import_web$36.getNextElement)(_tmpl$$3), _el$2 = _el$.firstChild;
		(0, import_web$39.style)(_el$, containerStyle);
		(0, import_web$39.style)(_el$2, gridStyle);
		(0, import_web$37.insert)(_el$2, (0, import_web$38.createComponent)(For$1, {
			get each() {
				return queue();
			},
			children: (item, idx) => {
				const isSelected = () => inspectedIndex() === idx();
				const isInteractable = item.status === "done" || item.status === "compressing";
				return (() => {
					const _el$3 = (0, import_web$36.getNextElement)(_tmpl$4$1), _el$1 = _el$3.firstChild, [_el$10, _co$2] = (0, import_web$32.getNextMarker)(_el$1.nextSibling), _el$5 = _el$10.nextSibling, _el$11 = _el$5.nextSibling, [_el$12, _co$3] = (0, import_web$32.getNextMarker)(_el$11.nextSibling);
					_el$3.$$click = () => isInteractable && setInspectedIndex(idx());
					_el$3.style.setProperty("position", "relative");
					_el$3.style.setProperty("aspectRatio", "1/1");
					_el$3.style.setProperty("border-radius", "8px");
					_el$3.style.setProperty("overflow", "hidden");
					_el$3.style.setProperty("background", "rgba(32, 34, 37, 0.5)");
					_el$3.style.setProperty("cursor", isInteractable ? "pointer" : "default");
					_el$3.style.setProperty("padding", "0");
					_el$3.style.setProperty("margin", "0");
					_el$3.style.setProperty("outline", "none");
					_el$3.style.setProperty("transition", "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)");
					(0, import_web$37.insert)(_el$3, (0, import_web$38.createComponent)(Show$2, {
						get when() {
							return item.previewUrl;
						},
						get children() {
							const _el$4 = (0, import_web$36.getNextElement)(_tmpl$2$3);
							_el$4.style.setProperty("width", "100%");
							_el$4.style.setProperty("height", "100%");
							_el$4.style.setProperty("object-fit", "cover");
							_el$4.style.setProperty("transition", "opacity 0.3s ease");
							(0, import_web$35.effect)((_p$) => {
								const _v$ = item.previewUrl, _v$2 = item.status === "pending" ? .4 : 1, _v$3 = item.name;
								_v$ !== _p$._v$ && (0, import_web$34.setAttribute)(_el$4, "src", _p$._v$ = _v$);
								_v$2 !== _p$._v$2 && _el$4.style.setProperty("opacity", _p$._v$2 = _v$2);
								_v$3 !== _p$._v$3 && (0, import_web$34.setAttribute)(_el$4, "alt", _p$._v$3 = _v$3);
								return _p$;
							}, {
								_v$: undefined,
								_v$2: undefined,
								_v$3: undefined
							});
							return _el$4;
						}
					}), _el$10, _co$2);
					_el$5.style.setProperty("position", "absolute");
					_el$5.style.setProperty("top", "6px");
					_el$5.style.setProperty("right", "6px");
					_el$5.style.setProperty("backdrop-filter", "blur(4px)");
					_el$5.style.setProperty("padding", "2px 6px");
					_el$5.style.setProperty("border-radius", "4px");
					_el$5.style.setProperty("font-size", "9px");
					_el$5.style.setProperty("font-weight", "700");
					_el$5.style.setProperty("text-transform", "uppercase");
					_el$5.style.setProperty("color", "white");
					_el$5.style.setProperty("box-shadow", "0 2px 4px rgba(0,0,0,0.2)");
					(0, import_web$37.insert)(_el$5, () => item.status === "compressing" && item.currentPass ? `Pass ${item.currentPass}` : item.status === "pending" ? "WAIT" : item.status);
					(0, import_web$37.insert)(_el$3, (0, import_web$38.createComponent)(Show$2, {
						get when() {
							return item.status === "done";
						},
						get children() {
							const _el$6 = (0, import_web$36.getNextElement)(_tmpl$3$2), _el$7 = _el$6.firstChild, _el$9 = _el$7.nextSibling, [_el$0, _co$] = (0, import_web$32.getNextMarker)(_el$9.nextSibling), _el$8 = _el$0.nextSibling;
							_el$6.style.setProperty("position", "absolute");
							_el$6.style.setProperty("bottom", "0");
							_el$6.style.setProperty("left", "0");
							_el$6.style.setProperty("right", "0");
							_el$6.style.setProperty("background", "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)");
							_el$6.style.setProperty("padding", "8px 4px 4px");
							_el$6.style.setProperty("text-align", "center");
							_el$6.style.setProperty("font-size", "10px");
							_el$6.style.setProperty("font-weight", "600");
							_el$6.style.setProperty("color", "#fff");
							_el$6.style.setProperty("text-shadow", "0 1px 2px rgba(0,0,0,0.8)");
							(0, import_web$37.insert)(_el$6, () => Math.round((1 - (item.compressedFile?.size || 0) / item.file.size) * 100), _el$0, _co$);
							return _el$6;
						}
					}), _el$12, _co$3);
					(0, import_web$35.effect)((_p$) => {
						const _v$4 = isSelected() ? "2px solid var(--brand-experiment)" : item.status === "compressing" ? "2px dashed var(--brand-experiment)" : "1px solid rgba(255,255,255,0.1)", _v$5 = isSelected() ? "scale(1.02)" : "scale(1)", _v$6 = isSelected() ? "0 4px 12px rgba(0,0,0,0.3)" : "none", _v$7 = item.status === "done" ? "rgba(59, 165, 93, 0.95)" : "rgba(0, 0, 0, 0.7)";
						_v$4 !== _p$._v$4 && _el$3.style.setProperty("border", _p$._v$4 = _v$4);
						_v$5 !== _p$._v$5 && _el$3.style.setProperty("transform", _p$._v$5 = _v$5);
						_v$6 !== _p$._v$6 && _el$3.style.setProperty("box-shadow", _p$._v$6 = _v$6);
						_v$7 !== _p$._v$7 && _el$5.style.setProperty("background", _p$._v$7 = _v$7);
						return _p$;
					}, {
						_v$4: undefined,
						_v$5: undefined,
						_v$6: undefined,
						_v$7: undefined
					});
					(0, import_web$31.runHydrationEvents)();
					return _el$3;
				})();
			}
		}));
		return _el$;
	})();
};
(0, import_web$30.delegateEvents)(["click"]);

//#endregion
//#region plugins/image-compressor/components/ManualCompressionControls.jsx
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
var import_web$23 = __toESM(require_web(), 1);
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
var import_web$26 = __toESM(require_web(), 1);
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$19.template)(`<div><div></div><div><div></div><div></div></div><div><div><div><div><!#><!/><span><!#><!/>%</span></div><!#><!/></div><div><div><!#><!/><span><!#><!/>px</span></div><!#><!/></div></div></div><div><!#><!/><!#><!/></div></div>`, 44), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$19.template)(`<button type="button"></button>`, 2);
const { ui: { Button: Button$1, ButtonColors: ButtonColors$1, ButtonSizes: ButtonSizes$1, Slider: Slider$1, Text: Text$2, TextTags: TextTags$1 }, solid: { For, Show: Show$1 } } = shelter;
const ManualCompressionControls = (props) => {
	const { localMaxDim, setLocalMaxDim, localQuality, setLocalQuality, localFormat, setLocalFormat, onRecompress, index } = props;
	const controlStyle = {
		"margin-top": "12px",
		padding: "16px",
		background: "rgba(0, 0, 0, 0.4)",
		"border-radius": "8px",
		border: "1px solid rgba(255, 255, 255, 0.05)"
	};
	const headerStyle = {
		display: "flex",
		"align-items": "center",
		"justify-content": "space-between",
		"margin-bottom": "12px"
	};
	const rowStyle = {
		display: "grid",
		"grid-template-columns": "1fr 1fr",
		gap: "16px",
		"margin-bottom": "16px"
	};
	const labelStyle = {
		display: "flex",
		"justify-content": "space-between",
		"align-items": "center",
		"margin-bottom": "4px"
	};
	const valueStyle = {
		color: "var(--brand-experiment)",
		"font-family": "monospace",
		"font-size": "12px"
	};
	const formats = [
		{
			label: t("jpeg"),
			value: "image/jpeg"
		},
		{
			label: t("webp"),
			value: "image/webp"
		},
		{
			label: t("png"),
			value: "image/png"
		},
		{
			label: t("gif"),
			value: "image/gif"
		},
		{
			label: t("avif"),
			value: "image/avif"
		}
	];
	return (() => {
		const _el$ = (0, import_web$23.getNextElement)(_tmpl$$2), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$6 = _el$3.nextSibling, _el$7 = _el$6.firstChild, _el$8 = _el$7.firstChild, _el$9 = _el$8.firstChild, _el$12 = _el$9.firstChild, [_el$13, _co$2] = (0, import_web$25.getNextMarker)(_el$12.nextSibling), _el$0 = _el$13.nextSibling, _el$10 = _el$0.firstChild, [_el$11, _co$] = (0, import_web$25.getNextMarker)(_el$10.nextSibling), _el$1 = _el$11.nextSibling, _el$14 = _el$9.nextSibling, [_el$15, _co$3] = (0, import_web$25.getNextMarker)(_el$14.nextSibling), _el$16 = _el$8.nextSibling, _el$17 = _el$16.firstChild, _el$22 = _el$17.firstChild, [_el$23, _co$5] = (0, import_web$25.getNextMarker)(_el$22.nextSibling), _el$18 = _el$23.nextSibling, _el$20 = _el$18.firstChild, [_el$21, _co$4] = (0, import_web$25.getNextMarker)(_el$20.nextSibling), _el$19 = _el$21.nextSibling, _el$24 = _el$17.nextSibling, [_el$25, _co$6] = (0, import_web$25.getNextMarker)(_el$24.nextSibling), _el$26 = _el$6.nextSibling, _el$27 = _el$26.firstChild, [_el$28, _co$7] = (0, import_web$25.getNextMarker)(_el$27.nextSibling), _el$29 = _el$28.nextSibling, [_el$30, _co$8] = (0, import_web$25.getNextMarker)(_el$29.nextSibling);
		(0, import_web$28.style)(_el$, controlStyle);
		(0, import_web$28.style)(_el$2, headerStyle);
		(0, import_web$26.insert)(_el$2, (0, import_web$27.createComponent)(Text$2, {
			get tag() {
				return TextTags$1.textSM;
			},
			style: {
				opacity: .9,
				"font-weight": "bold"
			},
			get children() {
				return t("manual_comp");
			}
		}));
		_el$3.style.setProperty("margin-bottom", "16px");
		(0, import_web$26.insert)(_el$4, (0, import_web$27.createComponent)(Text$2, {
			get tag() {
				return TextTags$1.textXS;
			},
			get children() {
				return t("output_format");
			}
		}));
		_el$5.style.setProperty("display", "flex");
		_el$5.style.setProperty("gap", "4px");
		_el$5.style.setProperty("flex-wrap", "wrap");
		(0, import_web$26.insert)(_el$5, (0, import_web$27.createComponent)(For, {
			each: formats,
			children: (fmt) => (() => {
				const _el$31 = (0, import_web$23.getNextElement)(_tmpl$2$2);
				_el$31.$$click = () => setLocalFormat(fmt.value);
				_el$31.style.setProperty("flex", "1");
				_el$31.style.setProperty("padding", "4px");
				_el$31.style.setProperty("font-size", "10px");
				_el$31.style.setProperty("border-radius", "4px");
				_el$31.style.setProperty("border", "1px solid rgba(255, 255, 255, 0.1)");
				_el$31.style.setProperty("cursor", "pointer");
				(0, import_web$26.insert)(_el$31, () => fmt.label);
				(0, import_web$22.effect)((_p$) => {
					const _v$6 = localFormat() === fmt.value ? "var(--brand-experiment)" : "rgba(255, 255, 255, 0.05)", _v$7 = localFormat() === fmt.value ? "white" : "var(--text-normal)";
					_v$6 !== _p$._v$6 && _el$31.style.setProperty("background", _p$._v$6 = _v$6);
					_v$7 !== _p$._v$7 && _el$31.style.setProperty("color", _p$._v$7 = _v$7);
					return _p$;
				}, {
					_v$6: undefined,
					_v$7: undefined
				});
				(0, import_web$21.runHydrationEvents)();
				return _el$31;
			})()
		}));
		_el$6.style.setProperty("display", "flex");
		_el$6.style.setProperty("flex-direction", "column");
		_el$6.style.setProperty("gap", "16px");
		_el$6.style.setProperty("margin-bottom", "16px");
		(0, import_web$28.style)(_el$7, rowStyle);
		(0, import_web$26.insert)(_el$9, (0, import_web$27.createComponent)(Text$2, {
			get tag() {
				return TextTags$1.textXS;
			},
			get children() {
				return t("comp_quality");
			}
		}), _el$13, _co$2);
		(0, import_web$26.insert)(_el$0, () => Math.round(localQuality() * 100), _el$11, _co$);
		(0, import_web$26.insert)(_el$8, (0, import_web$27.createComponent)(Slider$1, {
			min: .1,
			max: 1,
			step: .05,
			get value() {
				return localQuality();
			},
			onInput: setLocalQuality
		}), _el$15, _co$3);
		(0, import_web$26.insert)(_el$17, (0, import_web$27.createComponent)(Text$2, {
			get tag() {
				return TextTags$1.textXS;
			},
			get children() {
				return t("max_dimension");
			}
		}), _el$23, _co$5);
		(0, import_web$26.insert)(_el$18, localMaxDim, _el$21, _co$4);
		(0, import_web$26.insert)(_el$16, (0, import_web$27.createComponent)(Slider$1, {
			min: 512,
			max: 8192,
			step: 128,
			get value() {
				return localMaxDim();
			},
			onInput: setLocalMaxDim
		}), _el$25, _co$6);
		_el$26.style.setProperty("display", "flex");
		_el$26.style.setProperty("flex-direction", "column");
		_el$26.style.setProperty("gap", "8px");
		(0, import_web$26.insert)(_el$26, (0, import_web$27.createComponent)(Button$1, {
			get size() {
				return ButtonSizes$1.SMALL;
			},
			get color() {
				return ButtonColors$1.BRAND;
			},
			onClick: () => {
				onRecompress?.(index, {
					quality: localQuality(),
					maxDim: localMaxDim(),
					format: localFormat()
				});
			},
			style: { width: "100%" },
			get children() {
				return t("start_manual");
			}
		}), _el$28, _co$7);
		(0, import_web$26.insert)(_el$26, (0, import_web$27.createComponent)(Show$1, {
			get when() {
				return props.hasAutoResult && props.isManual;
			},
			get children() {
				return (0, import_web$27.createComponent)(Button$1, {
					get size() {
						return ButtonSizes$1.TINY;
					},
					get color() {
						return ButtonColors$1.RED;
					},
					get look() {
						return Button$1.Looks?.OUTLINED;
					},
					onClick: () => props.onRestoreAuto?.(index),
					style: { width: "100%" },
					get children() {
						return t("discard_manual");
					}
				});
			}
		}), _el$30, _co$8);
		(0, import_web$22.effect)((_p$) => {
			const _v$ = labelStyle, _v$2 = labelStyle, _v$3 = valueStyle, _v$4 = labelStyle, _v$5 = valueStyle;
			_p$._v$ = (0, import_web$28.style)(_el$4, _v$, _p$._v$);
			_p$._v$2 = (0, import_web$28.style)(_el$9, _v$2, _p$._v$2);
			_p$._v$3 = (0, import_web$28.style)(_el$0, _v$3, _p$._v$3);
			_p$._v$4 = (0, import_web$28.style)(_el$17, _v$4, _p$._v$4);
			_p$._v$5 = (0, import_web$28.style)(_el$18, _v$5, _p$._v$5);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined,
			_v$3: undefined,
			_v$4: undefined,
			_v$5: undefined
		});
		return _el$;
	})();
};
(0, import_web$20.delegateEvents)(["click"]);

//#endregion
//#region plugins/image-compressor/components/CompressionModal.jsx
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
var import_web$18 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$11.template)(`<div><!#><!/> / <!#><!/></div>`, 6), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$11.template)(`<div><!#><!/><!#><!/></div>`, 6), _tmpl$3$1 = /*#__PURE__*/ (0, import_web$11.template)(`<div><div><!#><!/><!#><!/></div><div></div></div>`, 10), _tmpl$4 = /*#__PURE__*/ (0, import_web$11.template)(`<div><div><!#><!/><div></div></div><div><!#><!/><!#><!/></div></div>`, 14), _tmpl$5 = /*#__PURE__*/ (0, import_web$11.template)(`<div><!#><!/><!#><!/><!#><!/></div>`, 8), _tmpl$6 = /*#__PURE__*/ (0, import_web$11.template)(`<div></div>`, 2);
const { ui: { Text: Text$1, TextTags, ModalRoot, ModalHeader, ModalFooter, ModalBody, ModalSizes, Header: Header$1, HeaderTags: HeaderTags$1, Button, ButtonColors, ButtonSizes }, solid: { Show, createSignal: createSignal$1, createMemo } } = shelter;
const CompressionModal = (props) => {
	const { started, finished, total, queue, localMaxDim, setLocalMaxDim, localQuality, setLocalQuality, localFormat, setLocalFormat, onCancel, onConfirm, onRestoreAuto, onRecompress } = props;
	const [inspectedIndex, setInspectedIndex] = createSignal$1(null);
	const [referenceType, setReferenceType] = createSignal$1("original");
	const inspectedItem = createMemo(() => {
		const q = queue();
		const idx = inspectedIndex();
		if (idx !== null) return q[idx];
		if (!started()) return null;
		const compressing = q.find((item) => item.status === "compressing");
		if (compressing) return compressing;
		if (finished() === total) return [...q].reverse().find((item) => item.status === "done");
		return null;
	});
	const bodyStyle = {
		padding: "24px",
		overflow: "hidden",
		display: "flex",
		"flex-direction": "column",
		height: "100%",
		gap: "16px"
	};
	const glassContainerStyle = {
		background: "rgba(32, 34, 37, 0.9)",
		"backdrop-filter": "blur(24px)",
		"border-radius": "16px",
		border: "1px solid rgba(255, 255, 255, 0.08)",
		overflow: "hidden",
		display: "flex",
		"flex-direction": "column",
		"max-height": "85vh",
		"min-height": "600px",
		"box-shadow": "0 8px 32px rgba(0, 0, 0, 0.4)"
	};
	const previewContainerStyle = {
		background: "rgba(0, 0, 0, 0.2)",
		"border-radius": "12px",
		border: "1px solid rgba(255, 255, 255, 0.05)",
		padding: "16px",
		flex: 1,
		display: "flex",
		"flex-direction": "column",
		overflow: "hidden",
		position: "relative"
	};
	return (0, import_web$17.createComponent)(ModalRoot, {
		get size() {
			return ModalSizes.LARGE;
		},
		style: {
			background: "transparent",
			"box-shadow": "none"
		},
		get children() {
			const _el$ = (0, import_web$14.getNextElement)(_tmpl$5), _el$40 = _el$.firstChild, [_el$41, _co$13] = (0, import_web$15.getNextMarker)(_el$40.nextSibling), _el$42 = _el$41.nextSibling, [_el$43, _co$14] = (0, import_web$15.getNextMarker)(_el$42.nextSibling), _el$44 = _el$43.nextSibling, [_el$45, _co$15] = (0, import_web$15.getNextMarker)(_el$44.nextSibling);
			(0, import_web$18.style)(_el$, glassContainerStyle);
			(0, import_web$16.insert)(_el$, (0, import_web$17.createComponent)(ModalHeader, {
				close: onCancel,
				style: {
					background: "rgba(255,255,255,0.03)",
					"border-bottom": "1px solid rgba(255, 255, 255, 0.05)",
					padding: "16px 24px"
				},
				get children() {
					const _el$2 = (0, import_web$14.getNextElement)(_tmpl$2$1), _el$9 = _el$2.firstChild, [_el$0, _co$3] = (0, import_web$15.getNextMarker)(_el$9.nextSibling), _el$1 = _el$0.nextSibling, [_el$10, _co$4] = (0, import_web$15.getNextMarker)(_el$1.nextSibling);
					_el$2.style.setProperty("display", "flex");
					_el$2.style.setProperty("align-items", "baseline");
					_el$2.style.setProperty("gap", "12px");
					(0, import_web$16.insert)(_el$2, (0, import_web$17.createComponent)(Header$1, {
						get tag() {
							return HeaderTags$1.H3;
						},
						style: {
							margin: 0,
							"font-weight": "700"
						},
						get children() {
							return t("plugin_name");
						}
					}), _el$0, _co$3);
					(0, import_web$16.insert)(_el$2, (0, import_web$17.createComponent)(Show, {
						when: total > 0,
						get children() {
							const _el$3 = (0, import_web$14.getNextElement)(_tmpl$$1), _el$5 = _el$3.firstChild, [_el$6, _co$] = (0, import_web$15.getNextMarker)(_el$5.nextSibling), _el$4 = _el$6.nextSibling, _el$7 = _el$4.nextSibling, [_el$8, _co$2] = (0, import_web$15.getNextMarker)(_el$7.nextSibling);
							_el$3.style.setProperty("background", "var(--brand-experiment)");
							_el$3.style.setProperty("padding", "2px 8px");
							_el$3.style.setProperty("border-radius", "12px");
							_el$3.style.setProperty("font-size", "12px");
							_el$3.style.setProperty("font-weight", "bold");
							_el$3.style.setProperty("color", "white");
							(0, import_web$16.insert)(_el$3, finished, _el$6, _co$);
							(0, import_web$16.insert)(_el$3, total, _el$8, _co$2);
							return _el$3;
						}
					}), _el$10, _co$4);
					return _el$2;
				}
			}), _el$41, _co$13);
			(0, import_web$16.insert)(_el$, (0, import_web$17.createComponent)(ModalBody, {
				style: bodyStyle,
				get children() {
					const _el$11 = (0, import_web$14.getNextElement)(_tmpl$4), _el$12 = _el$11.firstChild, _el$21 = _el$12.firstChild, [_el$22, _co$7] = (0, import_web$15.getNextMarker)(_el$21.nextSibling), _el$20 = _el$22.nextSibling, _el$23 = _el$12.nextSibling, _el$29 = _el$23.firstChild, [_el$30, _co$0] = (0, import_web$15.getNextMarker)(_el$29.nextSibling), _el$31 = _el$30.nextSibling, [_el$32, _co$1] = (0, import_web$15.getNextMarker)(_el$31.nextSibling);
					_el$11.style.setProperty("display", "flex");
					_el$11.style.setProperty("gap", "20px");
					_el$11.style.setProperty("height", "100%");
					_el$12.style.setProperty("flex", "2");
					_el$12.style.setProperty("display", "flex");
					_el$12.style.setProperty("flex-direction", "column");
					_el$12.style.setProperty("gap", "16px");
					_el$12.style.setProperty("overflow", "hidden");
					(0, import_web$16.insert)(_el$12, (0, import_web$17.createComponent)(Show, {
						get when() {
							return !!inspectedItem();
						},
						get fallback() {
							return (0, import_web$13.memo)(() => !!!started())() ? (() => {
								const _el$46 = (0, import_web$14.getNextElement)(_tmpl$6);
								(0, import_web$16.insert)(_el$46, (0, import_web$17.createComponent)(Text$1, { get children() {
									return t("preview_select");
								} }));
								(0, import_web$12.effect)((_$p) => (0, import_web$18.style)(_el$46, {
									...previewContainerStyle,
									"align-items": "center",
									"justify-content": "center",
									opacity: .5
								}, _$p));
								return _el$46;
							})() : null;
						},
						get children() {
							const _el$13 = (0, import_web$14.getNextElement)(_tmpl$3$1), _el$14 = _el$13.firstChild, _el$15 = _el$14.firstChild, [_el$16, _co$5] = (0, import_web$15.getNextMarker)(_el$15.nextSibling), _el$17 = _el$16.nextSibling, [_el$18, _co$6] = (0, import_web$15.getNextMarker)(_el$17.nextSibling), _el$19 = _el$14.nextSibling;
							_el$14.style.setProperty("display", "flex");
							_el$14.style.setProperty("justify-content", "space-between");
							_el$14.style.setProperty("align-items", "center");
							_el$14.style.setProperty("margin-bottom", "12px");
							(0, import_web$16.insert)(_el$14, (0, import_web$17.createComponent)(Text$1, {
								get tag() {
									return TextTags.textSM;
								},
								style: {
									"font-weight": "bold",
									opacity: .8
								},
								get children() {
									return inspectedItem()?.name;
								}
							}), _el$16, _co$5);
							(0, import_web$16.insert)(_el$14, (0, import_web$17.createComponent)(Show, {
								get when() {
									return inspectedIndex() !== null;
								},
								get children() {
									return (0, import_web$17.createComponent)(Button, {
										get size() {
											return ButtonSizes.TINY;
										},
										get color() {
											return ButtonColors.SECONDARY;
										},
										onClick: () => setInspectedIndex(null),
										get children() {
											return t("back_to_auto");
										}
									});
								}
							}), _el$18, _co$6);
							_el$19.style.setProperty("flex", "1");
							_el$19.style.setProperty("overflow", "hidden");
							_el$19.style.setProperty("border-radius", "8px");
							_el$19.style.setProperty("border", "1px solid rgba(0,0,0,0.5)");
							(0, import_web$16.insert)(_el$19, (0, import_web$17.createComponent)(ComparisonView, {
								get originalUrl() {
									return (0, import_web$13.memo)(() => !!(referenceType() === "auto" && inspectedItem()?.autoUrl))() ? inspectedItem()?.autoUrl : inspectedItem()?.previewUrl;
								},
								get compressedUrl() {
									return inspectedItem()?.compressedUrl || inspectedItem()?.previewUrl;
								},
								get originalSize() {
									return (0, import_web$13.memo)(() => !!(referenceType() === "auto" && inspectedItem()?.autoFile))() ? inspectedItem()?.autoFile?.size : inspectedItem()?.file?.size;
								},
								get compressedSize() {
									return inspectedItem()?.compressedFile?.size || inspectedItem()?.file?.size;
								},
								get metadata() {
									return inspectedItem()?.passMetadata;
								},
								referenceType,
								setReferenceType,
								get hasAutoResult() {
									return !!inspectedItem()?.autoUrl;
								},
								get isManual() {
									return (0, import_web$13.memo)(() => inspectedItem()?.compressedUrl !== inspectedItem()?.autoUrl)() && !!inspectedItem()?.autoUrl;
								},
								get imageKey() {
									return inspectedItem()?.name;
								}
							}));
							(0, import_web$12.effect)((_$p) => (0, import_web$18.style)(_el$13, previewContainerStyle, _$p));
							return _el$13;
						}
					}), _el$22, _co$7);
					_el$20.style.setProperty("height", "140px");
					_el$20.style.setProperty("flexShrink", "0");
					(0, import_web$16.insert)(_el$20, (0, import_web$17.createComponent)(CompressionQueue, {
						queue,
						inspectedIndex,
						setInspectedIndex
					}));
					_el$23.style.setProperty("flex", "1");
					_el$23.style.setProperty("min-width", "300px");
					_el$23.style.setProperty("display", "flex");
					_el$23.style.setProperty("flex-direction", "column");
					_el$23.style.setProperty("gap", "16px");
					_el$23.style.setProperty("overflowY", "auto");
					(0, import_web$16.insert)(_el$23, (0, import_web$17.createComponent)(Show, {
						get when() {
							return inspectedItem()?.status === "done";
						},
						get children() {
							return (0, import_web$17.createComponent)(ManualCompressionControls, {
								localMaxDim,
								setLocalMaxDim,
								localQuality,
								setLocalQuality,
								localFormat,
								setLocalFormat,
								onRecompress,
								onRestoreAuto: (idx) => {
									onRestoreAuto(idx);
									setReferenceType("original");
								},
								get hasAutoResult() {
									return !!inspectedItem()?.autoUrl;
								},
								get isManual() {
									return (0, import_web$13.memo)(() => inspectedItem()?.compressedUrl !== inspectedItem()?.autoUrl)() && !!inspectedItem()?.autoUrl;
								},
								get index() {
									return (0, import_web$13.memo)(() => inspectedIndex() !== null)() ? inspectedIndex() : queue().indexOf(inspectedItem());
								}
							});
						}
					}), _el$30, _co$0);
					(0, import_web$16.insert)(_el$23, (0, import_web$17.createComponent)(Show, {
						get when() {
							return (0, import_web$13.memo)(() => !!started())() && !inspectedItem()?.status === "done";
						},
						get children() {
							const _el$24 = (0, import_web$14.getNextElement)(_tmpl$2$1), _el$25 = _el$24.firstChild, [_el$26, _co$8] = (0, import_web$15.getNextMarker)(_el$25.nextSibling), _el$27 = _el$26.nextSibling, [_el$28, _co$9] = (0, import_web$15.getNextMarker)(_el$27.nextSibling);
							_el$24.style.setProperty("padding", "20px");
							_el$24.style.setProperty("background", "rgba(255,255,255,0.02)");
							_el$24.style.setProperty("border-radius", "12px");
							_el$24.style.setProperty("text-align", "center");
							(0, import_web$16.insert)(_el$24, (0, import_web$17.createComponent)(Text$1, {
								style: { opacity: .5 },
								get children() {
									return t("processing_images");
								}
							}), _el$26, _co$8);
							(0, import_web$16.insert)(_el$24, (0, import_web$17.createComponent)(Text$1, {
								get tag() {
									return TextTags.textXS;
								},
								style: {
									opacity: .3,
									marginTop: "8px"
								},
								get children() {
									return t("select_to_recompress");
								}
							}), _el$28, _co$9);
							return _el$24;
						}
					}), _el$32, _co$1);
					return _el$11;
				}
			}), _el$43, _co$14);
			(0, import_web$16.insert)(_el$, (0, import_web$17.createComponent)(ModalFooter, {
				style: {
					background: "rgba(0, 0, 0, 0.2)",
					padding: "16px 24px"
				},
				get children() {
					const _el$33 = (0, import_web$14.getNextElement)(_tmpl$5), _el$34 = _el$33.firstChild, [_el$35, _co$10] = (0, import_web$15.getNextMarker)(_el$34.nextSibling), _el$36 = _el$35.nextSibling, [_el$37, _co$11] = (0, import_web$15.getNextMarker)(_el$36.nextSibling), _el$38 = _el$37.nextSibling, [_el$39, _co$12] = (0, import_web$15.getNextMarker)(_el$38.nextSibling);
					_el$33.style.setProperty("width", "100%");
					_el$33.style.setProperty("display", "flex");
					_el$33.style.setProperty("justify-content", "flex-end");
					_el$33.style.setProperty("gap", "12px");
					(0, import_web$16.insert)(_el$33, (0, import_web$17.createComponent)(Show, {
						get when() {
							return !started();
						},
						get children() {
							return (0, import_web$17.createComponent)(Button, {
								get size() {
									return ButtonSizes.MEDIUM;
								},
								get color() {
									return ButtonColors.SECONDARY;
								},
								onClick: onCancel,
								get children() {
									return t("cancel");
								}
							});
						}
					}), _el$35, _co$10);
					(0, import_web$16.insert)(_el$33, (0, import_web$17.createComponent)(Show, {
						get when() {
							return (0, import_web$13.memo)(() => !!started())() && finished() !== total;
						},
						get children() {
							return (0, import_web$17.createComponent)(Button, {
								get size() {
									return ButtonSizes.MEDIUM;
								},
								get color() {
									return ButtonColors.RED;
								},
								onClick: onCancel,
								get children() {
									return t("cancel_abort");
								}
							});
						}
					}), _el$37, _co$11);
					(0, import_web$16.insert)(_el$33, (0, import_web$17.createComponent)(Show, {
						get when() {
							return (0, import_web$13.memo)(() => !!started())() && finished() === total;
						},
						get children() {
							return [(0, import_web$17.createComponent)(Button, {
								get size() {
									return ButtonSizes.MEDIUM;
								},
								get color() {
									return ButtonColors.SECONDARY;
								},
								onClick: onCancel,
								get children() {
									return t("discard_all");
								}
							}), (0, import_web$17.createComponent)(Button, {
								get size() {
									return ButtonSizes.MEDIUM;
								},
								get color() {
									return ButtonColors.BRAND;
								},
								onClick: onConfirm,
								get children() {
									return t("use_optimized");
								}
							})];
						}
					}), _el$39, _co$12);
					return _el$33;
				}
			}), _el$45, _co$15);
			return _el$;
		}
	});
};

//#endregion
//#region plugins/image-compressor/lib/constants.js
const Workflow = {
	DIRECT: "direct",
	REVIEW: "review"
};
const Strategy = {
	NONE: "none",
	ONCE: "once",
	AUTO: "auto"
};
const DEFAULTS = {
	workflow: Workflow.DIRECT,
	strategy: Strategy.AUTO,
	format: "image/webp",
	quality: .9,
	maxDimension: 8196,
	targetSize: 10,
	accuracy: .95
};
const processedFiles = new WeakSet();

//#endregion
//#region plugins/image-compressor/components/Settings.jsx
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web$2.template)(`<div><!#><!/><!#><!/><div></div></div>`, 8), _tmpl$2 = /*#__PURE__*/ (0, import_web$2.template)(`<button type="button"></button>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web$2.template)(`<div><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><!#><!/><div><div><!#><!/><!#><!/><div><!#><!/><!#><!/></div></div><div><!#><!/><!#><!/><div><!#><!/><!#><!/></div></div></div><!#><!/><div><!#><!/><!#><!/><!#><!/><!#><!/></div><div><!#><!/><!#><!/><!#><!/><!#><!/></div></div>`, 66);
const { ui: { Text, Slider, Header, HeaderTags, Divider, Space } } = shelter;
const SelectionItem = (props) => (() => {
	const _el$ = (0, import_web$7.getNextElement)(_tmpl$), _el$3 = _el$.firstChild, [_el$4, _co$] = (0, import_web$8.getNextMarker)(_el$3.nextSibling), _el$5 = _el$4.nextSibling, [_el$6, _co$2] = (0, import_web$8.getNextMarker)(_el$5.nextSibling), _el$2 = _el$6.nextSibling;
	_el$.style.setProperty("margin-bottom", "16px");
	(0, import_web$9.insert)(_el$, (0, import_web$10.createComponent)(Header, {
		get tag() {
			return HeaderTags.H5;
		},
		style: { "margin-bottom": "4px" },
		get children() {
			return props.label;
		}
	}), _el$4, _co$);
	(0, import_web$9.insert)(_el$, (0, import_web$10.createComponent)(Text, {
		style: {
			"margin-bottom": "8px",
			opacity: .7,
			"font-size": "12px"
		},
		get children() {
			return props.note;
		}
	}), _el$6, _co$2);
	_el$2.style.setProperty("display", "flex");
	_el$2.style.setProperty("gap", "8px");
	_el$2.style.setProperty("flex-wrap", "wrap");
	(0, import_web$9.insert)(_el$2, () => props.options.map((opt) => (() => {
		const _el$7 = (0, import_web$7.getNextElement)(_tmpl$2);
		_el$7.$$click = () => {
			props.onChange(opt.value);
		};
		_el$7.style.setProperty("padding", "6px 12px");
		_el$7.style.setProperty("border-radius", "4px");
		_el$7.style.setProperty("border", "1px solid rgba(255, 255, 255, 0.1)");
		_el$7.style.setProperty("cursor", "pointer");
		_el$7.style.setProperty("transition", "all 0.2s");
		_el$7.style.setProperty("font-size", "12px");
		(0, import_web$9.insert)(_el$7, () => opt.label);
		(0, import_web$5.effect)((_p$) => {
			const _v$ = props.value === opt.value ? "var(--brand-experiment)" : "rgba(255, 255, 255, 0.05)", _v$2 = props.value === opt.value ? "white" : "var(--text-normal)";
			_v$ !== _p$._v$ && _el$7.style.setProperty("background", _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && _el$7.style.setProperty("color", _p$._v$2 = _v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		(0, import_web$6.runHydrationEvents)();
		return _el$7;
	})()));
	return _el$;
})();
const Settings = () => {
	const store$1 = shelter.plugin.store;
	return (() => {
		const _el$8 = (0, import_web$7.getNextElement)(_tmpl$3), _el$46 = _el$8.firstChild, [_el$47, _co$17] = (0, import_web$8.getNextMarker)(_el$46.nextSibling), _el$48 = _el$47.nextSibling, [_el$49, _co$18] = (0, import_web$8.getNextMarker)(_el$48.nextSibling), _el$50 = _el$49.nextSibling, [_el$51, _co$19] = (0, import_web$8.getNextMarker)(_el$50.nextSibling), _el$52 = _el$51.nextSibling, [_el$53, _co$20] = (0, import_web$8.getNextMarker)(_el$52.nextSibling), _el$54 = _el$53.nextSibling, [_el$55, _co$21] = (0, import_web$8.getNextMarker)(_el$54.nextSibling), _el$56 = _el$55.nextSibling, [_el$57, _co$22] = (0, import_web$8.getNextMarker)(_el$56.nextSibling), _el$58 = _el$57.nextSibling, [_el$59, _co$23] = (0, import_web$8.getNextMarker)(_el$58.nextSibling), _el$60 = _el$59.nextSibling, [_el$61, _co$24] = (0, import_web$8.getNextMarker)(_el$60.nextSibling), _el$9 = _el$61.nextSibling, _el$0 = _el$9.firstChild, _el$14 = _el$0.firstChild, [_el$15, _co$5] = (0, import_web$8.getNextMarker)(_el$14.nextSibling), _el$16 = _el$15.nextSibling, [_el$17, _co$6] = (0, import_web$8.getNextMarker)(_el$16.nextSibling), _el$1 = _el$17.nextSibling, _el$10 = _el$1.firstChild, [_el$11, _co$3] = (0, import_web$8.getNextMarker)(_el$10.nextSibling), _el$12 = _el$11.nextSibling, [_el$13, _co$4] = (0, import_web$8.getNextMarker)(_el$12.nextSibling), _el$18 = _el$0.nextSibling, _el$24 = _el$18.firstChild, [_el$25, _co$9] = (0, import_web$8.getNextMarker)(_el$24.nextSibling), _el$26 = _el$25.nextSibling, [_el$27, _co$0] = (0, import_web$8.getNextMarker)(_el$26.nextSibling), _el$19 = _el$27.nextSibling, _el$20 = _el$19.firstChild, [_el$21, _co$7] = (0, import_web$8.getNextMarker)(_el$20.nextSibling), _el$22 = _el$21.nextSibling, [_el$23, _co$8] = (0, import_web$8.getNextMarker)(_el$22.nextSibling), _el$62 = _el$9.nextSibling, [_el$63, _co$25] = (0, import_web$8.getNextMarker)(_el$62.nextSibling), _el$28 = _el$63.nextSibling, _el$29 = _el$28.firstChild, [_el$30, _co$1] = (0, import_web$8.getNextMarker)(_el$29.nextSibling), _el$31 = _el$30.nextSibling, [_el$32, _co$10] = (0, import_web$8.getNextMarker)(_el$31.nextSibling), _el$33 = _el$32.nextSibling, [_el$34, _co$11] = (0, import_web$8.getNextMarker)(_el$33.nextSibling), _el$35 = _el$34.nextSibling, [_el$36, _co$12] = (0, import_web$8.getNextMarker)(_el$35.nextSibling), _el$37 = _el$28.nextSibling, _el$38 = _el$37.firstChild, [_el$39, _co$13] = (0, import_web$8.getNextMarker)(_el$38.nextSibling), _el$40 = _el$39.nextSibling, [_el$41, _co$14] = (0, import_web$8.getNextMarker)(_el$40.nextSibling), _el$42 = _el$41.nextSibling, [_el$43, _co$15] = (0, import_web$8.getNextMarker)(_el$42.nextSibling), _el$44 = _el$43.nextSibling, [_el$45, _co$16] = (0, import_web$8.getNextMarker)(_el$44.nextSibling);
		_el$8.style.setProperty("padding", "0 8px");
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H3;
			},
			style: {
				"margin-bottom": "16px",
				"margin-top": "8px"
			},
			get children() {
				return t("general_settings");
			}
		}), _el$47, _co$17);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(SelectionItem, {
			get label() {
				return t("upload_mode");
			},
			get note() {
				return t("upload_mode_note");
			},
			get value() {
				return store$1.workflow || DEFAULTS.workflow;
			},
			onChange: (v) => {
				store$1.workflow = v;
			},
			get options() {
				return [{
					label: t("review_before_upload"),
					value: Workflow.REVIEW
				}, {
					label: t("automatic_upload"),
					value: Workflow.DIRECT
				}];
			}
		}), _el$49, _co$18);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(SelectionItem, {
			get label() {
				return t("auto_compress_trigger");
			},
			get note() {
				return t("auto_compress_trigger_note");
			},
			get value() {
				return store$1.strategy || DEFAULTS.strategy;
			},
			onChange: (v) => {
				store$1.strategy = v;
			},
			get options() {
				return [
					{
						label: t("smart_size_limit"),
						value: Strategy.AUTO
					},
					{
						label: t("always_compress"),
						value: Strategy.ONCE
					},
					{
						label: t("never"),
						value: Strategy.NONE
					}
				];
			}
		}), _el$51, _co$19);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(Divider, {
			mt: true,
			mb: true
		}), _el$53, _co$20);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H3;
			},
			style: { "margin-bottom": "16px" },
			get children() {
				return t("compression_pipeline");
			}
		}), _el$55, _co$21);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(SelectionItem, {
			get label() {
				return t("output_format");
			},
			get note() {
				return t("output_format_note");
			},
			get value() {
				return store$1.format || DEFAULTS.format;
			},
			onChange: (v) => {
				store$1.format = v;
			},
			get options() {
				return [
					{
						label: t("jpeg"),
						value: "image/jpeg"
					},
					{
						label: t("webp"),
						value: "image/webp"
					},
					{
						label: t("png"),
						value: "image/png"
					},
					{
						label: t("gif"),
						value: "image/gif"
					},
					{
						label: t("avif"),
						value: "image/avif"
					}
				];
			}
		}), _el$57, _co$22);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(Divider, {
			mt: true,
			mb: true
		}), _el$59, _co$23);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H3;
			},
			style: { "margin-bottom": "16px" },
			get children() {
				return t("default_params");
			}
		}), _el$61, _co$24);
		_el$9.style.setProperty("display", "grid");
		_el$9.style.setProperty("grid-template-columns", "1fr 1fr");
		_el$9.style.setProperty("gap", "16px");
		(0, import_web$9.insert)(_el$0, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H5;
			},
			get children() {
				return t("comp_quality");
			}
		}), _el$15, _co$5);
		(0, import_web$9.insert)(_el$0, (0, import_web$10.createComponent)(Text, {
			style: {
				"font-size": "12px",
				opacity: .7
			},
			get children() {
				return t("comp_quality_note");
			}
		}), _el$17, _co$6);
		_el$1.style.setProperty("margin-top", "8px");
		(0, import_web$9.insert)(_el$1, (0, import_web$10.createComponent)(Text, { get children() {
			return [(0, import_web$4.memo)(() => Math.round((store$1.quality || DEFAULTS.quality) * 100)), "%"];
		} }), _el$11, _co$3);
		(0, import_web$9.insert)(_el$1, (0, import_web$10.createComponent)(Slider, {
			min: .1,
			max: 1,
			step: .05,
			get value() {
				return store$1.quality || DEFAULTS.quality;
			},
			onInput: (v) => {
				store$1.quality = v;
			}
		}), _el$13, _co$4);
		(0, import_web$9.insert)(_el$18, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H5;
			},
			get children() {
				return t("convergence_accuracy");
			}
		}), _el$25, _co$9);
		(0, import_web$9.insert)(_el$18, (0, import_web$10.createComponent)(Text, {
			style: {
				"font-size": "12px",
				opacity: .7
			},
			get children() {
				return t("convergence_accuracy_note");
			}
		}), _el$27, _co$0);
		_el$19.style.setProperty("margin-top", "8px");
		(0, import_web$9.insert)(_el$19, (0, import_web$10.createComponent)(Text, { get children() {
			return [(0, import_web$4.memo)(() => Math.round((store$1.accuracy || DEFAULTS.accuracy) * 100)), "%"];
		} }), _el$21, _co$7);
		(0, import_web$9.insert)(_el$19, (0, import_web$10.createComponent)(Slider, {
			min: .5,
			max: .99,
			step: .01,
			get value() {
				return store$1.accuracy || DEFAULTS.accuracy;
			},
			onInput: (v) => {
				store$1.accuracy = v;
			}
		}), _el$23, _co$8);
		(0, import_web$9.insert)(_el$8, (0, import_web$10.createComponent)(Space, {}), _el$63, _co$25);
		_el$28.style.setProperty("margin-top", "8px");
		(0, import_web$9.insert)(_el$28, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H5;
			},
			get children() {
				return t("max_dimension");
			}
		}), _el$30, _co$1);
		(0, import_web$9.insert)(_el$28, (0, import_web$10.createComponent)(Text, {
			style: {
				"font-size": "12px",
				opacity: .7
			},
			get children() {
				return t("max_dimension_note");
			}
		}), _el$32, _co$10);
		(0, import_web$9.insert)(_el$28, (0, import_web$10.createComponent)(Text, { get children() {
			return [(0, import_web$4.memo)(() => store$1.maxDimension || DEFAULTS.maxDimension), "px"];
		} }), _el$34, _co$11);
		(0, import_web$9.insert)(_el$28, (0, import_web$10.createComponent)(Slider, {
			min: 512,
			max: 8192,
			step: 128,
			get value() {
				return store$1.maxDimension || DEFAULTS.maxDimension;
			},
			onInput: (v) => {
				store$1.maxDimension = v;
			}
		}), _el$36, _co$12);
		_el$37.style.setProperty("margin-top", "16px");
		(0, import_web$9.insert)(_el$37, (0, import_web$10.createComponent)(Header, {
			get tag() {
				return HeaderTags.H5;
			},
			get children() {
				return t("target_threshold");
			}
		}), _el$39, _co$13);
		(0, import_web$9.insert)(_el$37, (0, import_web$10.createComponent)(Text, {
			style: {
				"font-size": "12px",
				opacity: .7
			},
			get children() {
				return t("target_threshold_note");
			}
		}), _el$41, _co$14);
		(0, import_web$9.insert)(_el$37, (0, import_web$10.createComponent)(Text, { get children() {
			return [(0, import_web$4.memo)(() => store$1.targetSize || DEFAULTS.targetSize), "MB"];
		} }), _el$43, _co$15);
		(0, import_web$9.insert)(_el$37, (0, import_web$10.createComponent)(Slider, {
			min: .5,
			max: 50,
			step: .5,
			get value() {
				return store$1.targetSize || DEFAULTS.targetSize;
			},
			onInput: (v) => {
				store$1.targetSize = v;
			}
		}), _el$45, _co$16);
		return _el$8;
	})();
};
(0, import_web$3.delegateEvents)(["click"]);

//#endregion
//#region plugins/image-compressor/lib/codec.js
const { util: { log: log$2 } } = shelter;
let worker = null;
let jobId = 0;
const pendingJobs = new Map();
async function initCodecs() {
	if (worker) return;
	try {
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
			pendingJobs.set(initId, {
				resolve,
				reject
			});
		});
		worker.postMessage({
			id: initId,
			type: "INIT"
		});
		await initPromise;
		log$2("ImageMagick Worker initialized.");
	} catch (err) {
		log$2(`Failed to initialize ImageMagick Worker: ${err.message}`, "error");
		throw err;
	}
}
/** Map MIME type to extension */
function toExtension(mime) {
	switch (mime) {
		case "image/jpeg": return "jpg";
		case "image/png": return "png";
		case "image/gif": return "gif";
		case "image/avif": return "avif";
		case "image/webp":
		default: return "webp";
	}
}
async function processImage(file, { quality, maxDimension, format, fileName }) {
	await initCodecs();
	const bytes = await file.arrayBuffer();
	const id = jobId++;
	const ext = toExtension(format);
	const baseName = (fileName || file.name).replace(/\.[^/.]+$/, "");
	const outputName = `${baseName}.${ext}`;
	const jobPromise = new Promise((resolve, reject) => {
		pendingJobs.set(id, {
			resolve,
			reject
		});
	});
	worker.postMessage({
		id,
		type: "PROCESS",
		payload: {
			bytes,
			quality,
			maxDimension,
			format
		}
	}, [bytes]);
	const { data, quality: outQuality } = await jobPromise;
	const result = new File([data], outputName, {
		type: format,
		lastModified: Date.now()
	});
	result.quality = outQuality;
	return result;
}

//#endregion
//#region plugins/image-compressor/lib/util.js
const { util: { log: log$1 } } = shelter;
var QualityCurve = class {
	constructor() {
		this.points = [];
		this.lastSide = 0;
		this.consecutiveSideCount = 0;
	}
	add(q, size) {
		if (size <= 0 || this.points.some((p) => p.q === q)) return;
		this.points.push({
			q,
			size
		});
		this.points.sort((a, b) => a.q - b.q);
	}
	predict(targetSize) {
		if (this.points.length === 0) return null;
		if (this.points.length === 1) {
			const p = this.points[0];
			const ratio = targetSize / p.size;
			const pred = Math.max(.01, Math.min(1, p.q * ratio));
			log$1(`QualityCurve: Extrapolating to Q=${pred.toFixed(4)}`);
			return pred;
		}
		let left = null;
		let right = null;
		for (const p of this.points) if (p.size <= targetSize) {
			if (!left || p.size > left.size) left = p;
		} else if (!right || p.size < right.size) right = p;
		if (left && right) {
			const logL = Math.log(left.size);
			const logR = Math.log(right.size);
			const logT = Math.log(targetSize);
			let leftWeight = 1;
			let rightWeight = 1;
			if (this.consecutiveSideCount >= 2) {
				if (this.lastSide === -1) rightWeight = .5;
else if (this.lastSide === 1) leftWeight = .5;
			}
			const num = leftWeight * left.q * (logR - logT) + rightWeight * right.q * (logT - logL);
			const den = rightWeight * (logT - logL) + leftWeight * (logR - logT);
			const predicted$1 = num / den;
			log$1(`QualityCurve: Illinois Interpolation Q=${predicted$1.toFixed(6)} [Side: ${this.lastSide}, Count: ${this.consecutiveSideCount}]`);
			return Math.max(.01, Math.min(1, predicted$1));
		}
		const n = this.points.length;
		let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
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
		log$1(`QualityCurve: Regression Q=${predicted.toFixed(6)}`);
		return Math.max(.01, Math.min(1, predicted));
	}
	updateState(newSize, targetSize) {
		const side = newSize <= targetSize ? -1 : 1;
		if (side === this.lastSide) this.consecutiveSideCount++;
else {
			this.lastSide = side;
			this.consecutiveSideCount = 1;
		}
	}
	getPoints() {
		return [...this.points];
	}
};
async function compressImage(file, { quality, maxDimension, targetMB, strategy, format, accuracy = .95, onPass = () => {} }) {
	const targetSize = targetMB * 1024 * 1024;
	log$1(`Starting compression strategy: ${strategy} for ${file.name} (${file.size} bytes)`);
	if (strategy === Strategy.NONE) return file;
	if (strategy === Strategy.ONCE) {
		const result = await processImage(file, {
			quality,
			maxDimension,
			format,
			fileName: file.name
		});
		onPass(1, quality, result, [{
			q: quality,
			size: result.size
		}]);
		return result;
	}
	let lastProcessedFile = file;
	let pass = 1;
	let lastUpdateTime = 0;
	const UPDATE_INTERVAL = 300;
	const curve = new QualityCurve();
	let lowQ = .3;
	let highQ = quality;
	const seenSizes = new Set();
	const seenQualities = new Set();
	const MAX_PASSES = 12;
	log$1(`Target size: ${targetSize} bytes (${targetMB} MB)`);
	while (pass <= MAX_PASSES) {
		let currentQuality;
		let predicted = null;
		if (pass === 1) currentQuality = highQ;
else {
			predicted = curve.predict(targetSize);
			if (predicted === null) currentQuality = (lowQ + highQ) / 2;
else {
				currentQuality = Math.max(lowQ, Math.min(highQ, predicted));
				if (Math.abs(currentQuality - lowQ) < 1e-4 && lowQ < highQ) currentQuality = (lowQ + highQ) / 2;
			}
		}
		let effectiveQ = Math.round(currentQuality * 100) / 100;
		if (seenQualities.has(effectiveQ)) {
			const direction = (predicted ?? 1) > effectiveQ ? .01 : -.01;
			effectiveQ = Math.round((effectiveQ + direction) * 100) / 100;
		}
		effectiveQ = Math.max(.01, Math.min(1, effectiveQ));
		if (pass > 1) effectiveQ = Math.max(Math.round(lowQ * 100) / 100, Math.min(Math.round(highQ * 100) / 100, effectiveQ));
		log$1(`Pass ${pass}: Q=${effectiveQ.toFixed(2)} ([${lowQ.toFixed(3)}, ${highQ.toFixed(3)}])`);
		const resultFile = await processImage(file, {
			quality: effectiveQ,
			maxDimension,
			format,
			fileName: file.name
		});
		log$1(`Pass ${pass} result: ${resultFile.size} bytes (${resultFile.type}) (Target: ${targetSize})`);
		if (seenSizes.has(resultFile.size)) {
			const isFarFromTarget = Math.abs(resultFile.size - targetSize) > targetSize * (1 - accuracy);
			const isUnderTarget = resultFile.size < targetSize;
			if (isFarFromTarget && isUnderTarget && effectiveQ < .999 && highQ - lowQ > .005) {
				log$1(`Size plateau reached at ${resultFile.size} bytes, but still far from target. Pushing quality bounds up.`);
				lowQ = Math.min(effectiveQ + .001, 1);
				if (highQ <= lowQ + .001) highQ = Math.min(lowQ + .1, 1);
			} else {
				log$1(`Size plateau reached at ${resultFile.size} bytes, stopping.`);
				break;
			}
		}
		seenQualities.add(effectiveQ);
		seenSizes.add(resultFile.size);
		curve.add(effectiveQ, resultFile.size);
		curve.updateState(resultFile.size, targetSize);
		const now = Date.now();
		if (now - lastUpdateTime > UPDATE_INTERVAL || resultFile.size <= targetSize || pass === MAX_PASSES) {
			onPass(pass, effectiveQ, resultFile, curve.getPoints());
			lastUpdateTime = now;
		}
		if (resultFile.size <= targetSize) {
			if (lastProcessedFile === file || lastProcessedFile.size > targetSize || resultFile.size > lastProcessedFile.size) lastProcessedFile = resultFile;
			lowQ = Math.max(lowQ, effectiveQ);
			if (resultFile.size > targetSize * accuracy) {
				log$1(`Target reached accurately enough: ${resultFile.size} > ${targetSize * accuracy}`);
				break;
			}
			if (pass === 1) {
				log$1("First pass under target, expanding search range to Q=1.0");
				highQ = 1;
			}
		} else {
			if (lastProcessedFile === file || resultFile.size < lastProcessedFile.size && lastProcessedFile.size > targetSize) lastProcessedFile = resultFile;
			highQ = Math.min(highQ, effectiveQ);
		}
		if (Math.round(highQ * 100) <= Math.round(lowQ * 100)) {
			log$1(`Quality range converged (discrete): ${Math.round(lowQ * 100)} == ${Math.round(highQ * 100)}`);
			break;
		}
		pass++;
	}
	log$1(`Final size: ${lastProcessedFile.size} after ${pass - 1} passes. Final quality: ${lastProcessedFile.quality ?? "N/A"}`);
	return lastProcessedFile;
}
function getLimit() {
	const UserStore = shelter.flux.storesFlat.UserStore;
	const user = UserStore?.getCurrentUser();
	return user?.premiumType === 2 ? 1048576e3 : 10485760;
}

//#endregion
//#region plugins/image-compressor/index.jsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
const { flux: { dispatcher, intercept }, patcher, plugin: { store }, solid: { createEffect, createSignal, untrack }, ui: { ToastColors, openModal, showToast }, util: { log } } = shelter;
for (const key in DEFAULTS) store[key] ??= DEFAULTS[key];
const unintercept = intercept((action) => {
	if (action.type === "UPLOAD_ATTACHMENT_ADD_FILES") {
		const { files, channelId, draftType } = action;
		const limit = getLimit();
		const strategy = store.strategy || DEFAULTS.strategy;
		const workflow = store.workflow || DEFAULTS.workflow;
		if (strategy === Strategy.NONE) return;
		const targetBytes = (store.targetSize || DEFAULTS.targetSize) * 1024 * 1024;
		const filesToProcess = files.filter((f) => {
			const actualFile = f.file || f;
			const isImage = actualFile.type?.startsWith("image/");
			const isProcessed = processedFiles.has(actualFile);
			if (!isImage || isProcessed) return false;
			if (strategy === Strategy.AUTO) return actualFile.size > targetBytes || actualFile.size > limit;
			return strategy === Strategy.ONCE;
		});
		if (filesToProcess.length > 0) {
			log(`Intercepted image upload for channel ${channelId}`);
			const [finished, setFinished] = createSignal(0);
			const [started, setStarted] = createSignal(true);
			const [localQuality, setLocalQuality] = createSignal(store.quality || DEFAULTS.quality);
			const [localMaxDim, setLocalMaxDim] = createSignal(store.maxDimension || DEFAULTS.maxDimension);
			const [localTarget, setLocalTarget] = createSignal(store.targetSize || DEFAULTS.targetSize);
			const [localAccuracy, setLocalAccuracy] = createSignal(store.accuracy || DEFAULTS.accuracy);
			const [localFormat, setLocalFormat] = createSignal(store.format || DEFAULTS.format);
			const initialQueue = files.map((f) => {
				const actualFile = f.file || f;
				const isImage = actualFile.type?.startsWith("image/");
				const isProcessed = processedFiles.has(actualFile);
				let needsProcessing = isImage && !isProcessed;
				if (needsProcessing && strategy === Strategy.AUTO) needsProcessing = actualFile.size > targetBytes || actualFile.size > limit;
				return {
					name: actualFile.name,
					file: actualFile,
					isWrapped: !!f.file,
					original: f,
					needsProcessing,
					status: needsProcessing ? "pending" : "skipped",
					previewUrl: needsProcessing ? URL.createObjectURL(actualFile) : null,
					compressedFile: null,
					compressedUrl: null,
					autoFile: null,
					autoUrl: null,
					currentPass: 0,
					currentQuality: 0,
					passMetadata: null
				};
			});
			const [queue, setQueue] = createSignal(initialQueue);
			const totalToProcess = initialQueue.filter((i) => i.needsProcessing).length;
			let isCancelled = false;
			const closeModal = openModal((props) => (0, import_web.createComponent)(CompressionModal, (0, import_web$1.mergeProps)(props, {
				started,
				setStarted,
				finished,
				total: totalToProcess,
				queue,
				localMaxDim,
				setLocalMaxDim,
				localQuality,
				setLocalQuality,
				localTarget,
				setLocalTarget,
				localAccuracy,
				setLocalAccuracy,
				localFormat,
				setLocalFormat,
				onCancel: () => {
					isCancelled = true;
					props.close();
				},
				onConfirm: () => {
					const results = queue().map((item) => {
						if (item.needsProcessing && item.compressedFile) return item.isWrapped ? {
							...item.original,
							file: item.compressedFile
						} : item.compressedFile;
						return item.original;
					});
					finishUpload(results);
					props.close();
				},
				onRestoreAuto: (idx) => {
					if (idx === null) return;
					setQueue((q) => {
						const newQ = [...q];
						const item = newQ[idx];
						if (item.autoFile) {
							if (item.compressedUrl && item.compressedUrl !== item.autoUrl && item.compressedUrl !== item.previewUrl) URL.revokeObjectURL(item.compressedUrl);
							newQ[idx] = {
								...item,
								compressedFile: item.autoFile,
								compressedUrl: item.autoUrl,
								status: "done",
								passMetadata: null
							};
						}
						return newQ;
					});
				},
				onRecompress: async (idx, settings$1) => {
					if (idx === null) return;
					const currentItem = queue()[idx];
					if (!currentItem || !currentItem.file) return;
					setQueue((q) => {
						const newQ = [...q];
						const item = newQ[idx];
						const updates = { status: "compressing" };
						if (!item.autoFile && item.compressedFile) {
							updates.autoFile = item.compressedFile;
							updates.autoUrl = item.compressedUrl;
						}
						newQ[idx] = {
							...item,
							...updates
						};
						return newQ;
					});
					try {
						const compressed = await compressImage(currentItem.file, {
							quality: settings$1.quality,
							maxDimension: settings$1.maxDim,
							strategy: Strategy.ONCE,
							format: settings$1.format,
							onPass: (pass, quality, intermediateFile, points) => {
								setQueue((q) => {
									const newQ = [...q];
									const item = { ...newQ[idx] };
									if (intermediateFile) {
										if (item.compressedUrl && item.compressedUrl !== item.autoUrl && item.compressedUrl !== item.previewUrl) URL.revokeObjectURL(item.compressedUrl);
										item.compressedUrl = URL.createObjectURL(intermediateFile);
										item.compressedFile = intermediateFile;
									}
									item.currentPass = pass;
									item.currentQuality = quality;
									const existing = item.points || [];
									const merged = [...existing, ...points || []];
									item.points = Array.from(new Map(merged.map((p) => [p.q, p])).values()).sort((a, b) => a.q - b.q);
									item.passMetadata = {
										pass,
										quality,
										size: intermediateFile?.size || 0,
										points: item.points
									};
									newQ[idx] = item;
									return newQ;
								});
							}
						});
						processedFiles.add(compressed);
						const compUrl = URL.createObjectURL(compressed);
						setQueue((q) => {
							const newQ = [...q];
							const item = newQ[idx];
							if (item.compressedUrl && item.compressedUrl !== compUrl && item.compressedUrl !== item.autoUrl && item.compressedUrl !== item.previewUrl) URL.revokeObjectURL(item.compressedUrl);
							newQ[idx] = {
								...item,
								status: "done",
								compressedFile: compressed,
								compressedUrl: compUrl,
								passMetadata: null
							};
							return newQ;
						});
					} catch (err) {
						log(`Manual compression failed: ${err}`);
						setQueue((q) => {
							const newQ = [...q];
							newQ[idx] = {
								...newQ[idx],
								status: "done"
							};
							return newQ;
						});
					}
				}
			})));
			const finishUpload = (results) => {
				queue().forEach((item) => {
					if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
					if (item.compressedUrl) URL.revokeObjectURL(item.compressedUrl);
					if (item.autoUrl) URL.revokeObjectURL(item.autoUrl);
				});
				dispatcher.dispatch({
					type: "UPLOAD_ATTACHMENT_ADD_FILES",
					channelId,
					draftType,
					files: results
				});
			};
			let isRunning = false;
			const runCompression = async () => {
				if (isRunning) return;
				isRunning = true;
				try {
					for (const [idx, item] of initialQueue.entries()) {
						if (isCancelled) break;
						if (!item.needsProcessing) continue;
						setQueue((q) => {
							const newQ = [...q];
							newQ[idx].status = "compressing";
							return newQ;
						});
						const compressed = await compressImage(item.file, {
							quality: localQuality(),
							maxDimension: localMaxDim(),
							targetMB: localTarget(),
							accuracy: localAccuracy(),
							strategy,
							format: localFormat(),
							onPass: (pass, quality, intermediateFile, points) => {
								setQueue((q) => {
									const newQ = [...q];
									const item$1 = { ...newQ[idx] };
									item$1.currentPass = pass;
									item$1.currentQuality = quality;
									if (intermediateFile) {
										if (item$1.compressedUrl && item$1.compressedUrl !== item$1.previewUrl) URL.revokeObjectURL(item$1.compressedUrl);
										item$1.compressedFile = intermediateFile;
										item$1.compressedUrl = URL.createObjectURL(intermediateFile);
									}
									const existing = item$1.points || [];
									const merged = [...existing, ...points || []];
									item$1.points = Array.from(new Map(merged.map((p) => [p.q, p])).values()).sort((a, b) => a.q - b.q);
									item$1.passMetadata = {
										pass,
										quality,
										size: intermediateFile?.size || 0,
										points: item$1.points
									};
									newQ[idx] = item$1;
									return newQ;
								});
							}
						});
						if (isCancelled) break;
						processedFiles.add(compressed);
						const compUrl = URL.createObjectURL(compressed);
						setFinished((v) => v + 1);
						setQueue((q) => {
							const newQ = [...q];
							newQ[idx] = { ...newQ[idx] };
							newQ[idx].status = "done";
							if (newQ[idx].compressedUrl && newQ[idx].compressedUrl !== compUrl) URL.revokeObjectURL(newQ[idx].compressedUrl);
							newQ[idx].compressedFile = compressed;
							newQ[idx].compressedUrl = compUrl;
							newQ[idx].passMetadata = null;
							log(`Final: Set compressedUrl for ${item.name}, size ${compressed.size}`);
							return newQ;
						});
					}
					if (isCancelled) return;
					if (workflow === Workflow.DIRECT) {
						const results = queue().map((item) => {
							if (item.needsProcessing && item.compressedFile) return item.isWrapped ? {
								...item.original,
								file: item.compressedFile
							} : item.compressedFile;
							return item.original;
						});
						finishUpload(results);
						closeModal();
						showToast({
							title: t("plugin_name"),
							content: t("toast_processed", { count: totalToProcess }),
							color: ToastColors.SUCCESS,
							duration: 2e3
						});
					}
				} catch (e) {
					log(`Processing error: ${e}`, "error");
					showToast({
						title: t("plugin_name"),
						content: t("toast_error"),
						color: ToastColors.RED
					});
				}
			};
			createEffect(() => {
				if (started()) untrack(() => runCompression());
			});
			return false;
		}
	}
});
const unpatches = [];
async function patchStores() {
	const UserStore = await shelter.flux.awaitStore("UserStore");
	if (UserStore?.getCurrentUser) unpatches.push(patcher.after("getCurrentUser", UserStore, (_, user) => {
		if (user && user.premiumType !== 2) user.premiumType = 2;
		return user;
	}));
}
function onLoad() {
	log("Image Compressor loaded");
	initCodecs();
	patchStores();
}
function onUnload() {
	unintercept();
	for (const u of unpatches) u();
}
const settings = Settings;

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});