# SmartCV Browser Extension

> Chrome & Brave extension to capture job descriptions and generate optimized CVs directly from the browser.

## 🚀 Installation

1. Open **Chrome** or **Brave**
2. Navigate to `chrome://extensions/` (or `brave://extensions/`)
3. Enable **Developer mode** (toggle in top-right)
4. Click **"Load unpacked"**
5. Select this folder: `apps/browser-extension/`

## ✨ Features

- **Right-click capture**: Select text on any job listing → right-click → _"Send to SmartCV"_
- **Profile selection**: Choose from your saved SmartCV profiles
- **Template selection**: Harvard (Classic) or Creative (Modern)
- **AI-powered CV generation**: Generate tailored CVs using your SmartCV backend
- **PDF download**: Download the generated CV as PDF directly from the extension
- **Toast notifications**: Visual feedback when text is captured

## 🔧 Configuration

1. Click the SmartCV extension icon
2. Click the **⚙ Settings** button
3. Enter your SmartCV server URL (default: `http://localhost:3000`)
4. Click **Save** — the extension will test the connection

## 📋 Usage

1. Browse to a job listing
2. Select the job description text
3. Right-click → **"📋 Send to SmartCV"**
4. Click the extension icon to open the popup
5. Select your profile and template
6. Click **"Generate CV"**
7. Click **"Download PDF"** when ready

## 🏗 Project Structure

```
apps/browser-extension/
├── manifest.json          # Extension manifest (Manifest V3)
├── background.js          # Service worker (context menu, storage)
├── content.js             # Content script (toast notifications)
├── popup/
│   ├── popup.html         # Popup UI
│   ├── popup.css          # Premium dark theme styles
│   └── popup.js           # Popup logic (API, profiles, generation)
├── lib/
│   ├── jspdf.umd.min.js   # jsPDF bundle
│   └── pdf-generator.js   # PDF generation (Harvard + Creative)
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## ⚠ Requirements

- SmartCV backend running and accessible
- At least one saved profile in SmartCV
- AI provider configured (Gemini, OpenAI, or Claude)
