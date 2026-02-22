# Auto Skip Ads

Chrome extension to automatically skip ads on videos with React, TypeScript, and Ant Design.

## Features

- 🚀 **Auto Skip Ads**: Automatically skip video ads
- 🌍 **Multi-language Support**: English, Vietnamese, Chinese, Russian
- ⚙️ **Customizable Settings**: Configure skip delay and enable/disable features
- 🎨 **Modern UI**: Built with React, TypeScript, and Ant Design
- 📱 **Responsive Design**: Clean and user-friendly popup interface
- 🌓 **Dark/Light Theme**: Support for system, light, and dark themes
- 🔄 **Runtime Language Switching**: Change language without restarting extension

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
    ├── i18n.ts      # Chrome i18n API
    ├── storage.ts   # Chrome storage API
    ├── translations.ts # Custom runtime translations
    ├── theme.ts     # Theme management utilities
    ├── types.ts     # TypeScript definitions
    └── global.d.ts  # Chrome API types
```

### Multi-language Support
- `_locales/en/messages.json`: English translations
- `_locales/vi/messages.json`: Vietnamese translations
- `_locales/zh/messages.json`: Chinese translations
- `_locales/ru/messages.json`: Russian translations
- Chrome i18n API integration
- Runtime language switching
- Native language names in dropdown

### Theme Support
- System theme detection
- Light theme option
- Dark theme option
- Ant Design dark algorithm for proper theming
- CSS custom properties for full popup background
- Theme persistence in Chrome storage

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

- **Enable/Disable**: Turn extension on/off
- **Auto Skip**: Enable automatic ad skipping
- **Skip Delay**: Set delay before skipping (0-10 seconds)
- **Language**: Choose interface language (EN, VI, ZH, RU)
- **Theme**: Select light, dark, or system theme

## Permissions

- `storage`: Save user settings
- `activeTab`: Access current tab
- `host_permissions`: All websites for ad detection

## Technologies Used

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Ant Design**: UI component library with dark theme support
- **Webpack**: Build tool with chunk splitting
- **Chrome Extension API V3**: Latest extension standards

## License

MIT License - feel free to use this project for your own extensions!

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


```html
<button class="ytp-skip-ad-button ytp-ad-component--clickable" id="skip-button:i" style="">
    <div class="ytp-skip-ad-button__text">Skip</div>
    <span class="ytp-skip-ad-button__icon">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24"><path d="M20 ..." fill="white"></path></svg>
    </span>
</button>
```

```javascript
function findSkipButton() {
  // Ưu tiên 1: Tìm theo class chính (ổn định nhất)
  let btn = document.querySelector('.ytp-skip-ad-button');
  
  // Ưu tiên 2: Tìm theo pattern ID (nếu class không hoạt động)
  if (!btn) {
    btn = document.querySelector('[id^="skip-button:"].ytp-skip-ad-button');
  }
  
  // Ưu tiên 3: Tìm trong Shadow DOM của player
  if (!btn) {
    const player = document.querySelector('#movie_player, ytd-player');
    if (player?.shadowRoot) {
      btn = player.shadowRoot.querySelector('.ytp-skip-ad-button');
    }
  }
  
  return btn;
}

const enterEvent = new KeyboardEvent('keydown', {
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    bubbles: true // Quan trọng để sự kiện "nổi" lên các phần tử cha
});
const spaceEvent = new KeyboardEvent('keydown', {
    key: ' ',
    code: 'Space',
    keyCode: 32,
    which: 32,
    bubbles: true // Quan trọng để sự kiện "nổi" lên các phần tử cha
});

// Cách dùng:
const skipBtn = findSkipButton();
if (skipBtn) {
  console.log('Found skip button:', skipBtn);
  skipBtn.focus();
  // Thực hiện click...
  skipBtn.dispatchEvent(spaceEvent);
  skipBtn.dispatchEvent(enterEvent);
  skipBtn.click();
  console.log('Skip button clicked');
}
```