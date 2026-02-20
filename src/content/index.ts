import { ExtensionSettings } from '../utils/types';

let currentSettings: ExtensionSettings = {
  enabled: true,
  skipDelay: 0,
  autoSkip: true,
  language: 'en',
  theme: 'system'
};

const skipAd = () => {
  const skipButton = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .videoAdUiSkipButton, [aria-label*="Skip"], [aria-label*="Bỏ qua"]');
  
  if (skipButton && skipButton instanceof HTMLElement) {
    if (currentSettings.skipDelay > 0) {
      setTimeout(() => {
        skipButton.click();
        console.log('Ad skipped after delay');
      }, currentSettings.skipDelay * 1000);
    } else {
      skipButton.click();
      console.log('Ad skipped immediately');
    }
  }
};

const observeAds = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        const hasAd = document.querySelector('.ytp-ad-module, .ytp-ad-overlay-container, .videoAdUi, [data-ad-status]');
        if (hasAd && currentSettings.enabled && currentSettings.autoSkip) {
          skipAd();
        }
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SETTINGS_UPDATED') {
    currentSettings = message.settings;
    console.log('Settings updated:', currentSettings);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observeAds();
  });
} else {
  observeAds();
}

setInterval(() => {
  if (currentSettings.enabled && currentSettings.autoSkip) {
    skipAd();
  }
}, 1000);
