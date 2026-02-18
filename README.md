# 🛠️ Small-Ku's Shelter Plugins

A collection of premium, high-performance plugins for the [shelter](https://github.com/uwu/shelter) Discord client mod.

---

## 🌟 Featured Plugins

### [🖼️ Image Compressor](./plugins/image-compressor)
**Stop worrying about "Your file is too powerful".**

This plugin automatically intercepts large image uploads that exceed Discord's file size limit and compresses them on-the-fly using high-quality WASM-based encoders.

#### ✨ Key Features
- **🚀 Automated Interception**: Transparently catches large uploads and offers instant optimization.
- **📈 Smart Quality Prediction**: Uses a sophisticated curve-fitting algorithm to find the perfect quality settings for your target size.
- **🎨 Premium Comparison View**: Side-by-side interactive comparison with original images, featuring synchronous zoom and pan and live file size updates.
- **🛠️ Manual Fine-Tuning**: Full control over output formats (MozJPEG, libwebp, OxiPNG), custom dimensions, and quality levels with real-time previews.
- **🧵 Background Processing**: Powered by Web Workers to ensure Discord stays smooth even during heavy compression.
- **📦 Batch Queue**: Efficiently handle multiple image uploads simultaneously.

---

## 📥 Installation

1. Open your **Discord Settings**.
2. Navigate to the **shelter** section.
3. Go to **Plugins** and click **Install Plugin**.
4. Enter the URL for the plugin you want to install:

| Plugin | URL |
| :--- | :--- |
| **Image Compressor** | `https://small-ku.github.io/shelter-plugins/image-compressor` |

> [!TIP]
> Ensure **Lune Dev Mode** is enabled in shelter settings if you are developing or testing locally.

---

## 🛠️ Development

This repository is managed using [Bun](https://bun.sh/) and [Lune](https://github.com/uwu/shelter/tree/main/packages/lune).

### Prerequisites
- [Bun](https://bun.sh/) installed on your system.

### Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Small-Ku/shelter-plugins.git
   cd shelter-plugins
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Develop a plugin:**
   ```bash
   bun lune dev plugins/image-compressor
   ```

4. **Build and Preview:**
   ```bash
   bun lune ci
   # Host locally for testing
   bun x http-server dist/ --cors
   ```

---

## 🤝 Contributing

Contributions are welcome! Whether it's reporting a bug, suggesting a feature, or submitting a pull request, feel free to get involved.

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

<p align="center">Made with ❤️ by <a href="https://github.com/Small-Ku">Small-Ku</a></p>
