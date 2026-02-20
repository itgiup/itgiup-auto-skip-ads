# ITGIUP Auto Skip Ads

Chrome extension to automatically skip ads on videos with React, TypeScript, and Ant Design.

## Features

- 🚀 **Auto Skip Ads**: Automatically skip video ads
- 🌍 **Multi-language Support**: English and Vietnamese
- ⚙️ **Customizable Settings**: Configure skip delay and enable/disable features
- 🎨 **Modern UI**: Built with React, TypeScript, and Ant Design
- 📱 **Responsive Design**: Clean and user-friendly popup interface
- 🌓 **Dark/Light Theme**: Support for system, light, and dark themes

## Architecture

### Manifest V3 Structure
- `manifest.json`: Chrome extension manifest with latest standards
- `popup.html`: Extension popup interface
- `background.js`: Service worker for background operations
- `content.js`: Content script for page interaction

### Source Structure
```
src/
├── popup/           # React popup interface
│   ├── index.tsx    # Main popup component
│   └── popup.html   # Popup template
├── background/      # Background service worker
│   └── index.ts     # Background logic
├── content/         # Content scripts
│   └── index.ts     # Page interaction logic
└── utils/           # Shared utilities
    ├── i18n.ts      # Internationalization
    ├── storage.ts   # Chrome storage API
    ├── types.ts     # TypeScript definitions
    └── global.d.ts  # Chrome API types
```

### Multi-language Support
- `_locales/en/messages.json`: English translations
- `_locales/vi/messages.json`: Vietnamese translations
- Chrome i18n API integration

### Theme Support
- System theme detection
- Light theme option
- Dark theme option
- Ant Design dark algorithm for proper theming

## Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Loading Extension
1. Run `npm run build`
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `dist` folder

## Settings

- **Enable/Disable**: Turn the extension on/off
- **Auto Skip**: Enable automatic ad skipping
- **Skip Delay**: Set delay before skipping (0-10 seconds)

## Permissions

- `storage`: Save user settings
- `activeTab`: Access current tab
- `host_permissions`: All websites for ad detection

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Ant Design**: UI component library
- **Webpack**: Build tool
- **Chrome Extension API V3**: Latest extension standards
