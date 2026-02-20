import { ExtensionSettings } from '../utils/types';

let currentSettings: ExtensionSettings = {
  enabled: true,
  skipDelay: 0,
  autoSkip: true,
  language: 'en',
  theme: 'system'
};

// 1. Hàm tìm xuyên Shadow DOM
function queryShadow(selector: string, root: Document | ShadowRoot = document): Element | null {
  if (!root) return null;
  const el = root.querySelector(selector);
  if (el) return el;
  const nodes = root.querySelectorAll('*');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if ((node as any).shadowRoot) {
      const found = queryShadow(selector, (node as any).shadowRoot);
      if (found) return found;
    }
  }
  return null;
}

// 2. Hàm kiểm tra khả năng click
function isElementReady(el: Element | null): boolean {
  if (!el) return false;
  const style = window.getComputedStyle(el);
  return style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.pointerEvents !== 'none' &&
    (el as HTMLElement).offsetParent !== null;
}

// 3. Hàm click mô phỏng
function forceClick(el: Element): boolean {
  if (!isElementReady(el)) return false;

  console.log('Element ready, attempting click...');

  // Cách 1: Click trực tiếp với delay
  try {
    setTimeout(() => {
      (el as HTMLElement).click();
      console.log('Method 1: Direct click successful');
    }, 100);
    // return true;
  } catch (e) {
    console.log('Method 1 failed:', e);
  }

  // Cách 2: Focus + Enter với delay
  try {
    setTimeout(() => {
      (el as HTMLElement).focus();
      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        bubbles: true
      });
      el.dispatchEvent(enterEvent);
      console.log('Method 2: Focus + Enter successful');
    }, 200);
    // return true;
  } catch (e) {
    console.log('Method 2 failed:', e);
  }

  // Cách 3: Mouse event sequence
  try {
    setTimeout(() => {
      const rect = (el as HTMLElement).getBoundingClientRect();
      const clickX = rect.left + rect.width / 2;
      const clickY = rect.top + rect.height / 2;

      // Mouse down
      const mousedown = new MouseEvent('mousedown', {
        clientX: clickX,
        clientY: clickY,
        bubbles: true,
        cancelable: true
      });
      el.dispatchEvent(mousedown);

      // Mouse up + click
      setTimeout(() => {
        const mouseup = new MouseEvent('mouseup', {
          clientX: clickX,
          clientY: clickY,
          bubbles: true,
          cancelable: true
        });
        el.dispatchEvent(mouseup);

        const click = new MouseEvent('click', {
          clientX: clickX,
          clientY: clickY,
          bubbles: true,
          cancelable: true
        });
        el.dispatchEvent(click);
        console.log('Method 3: Mouse event sequence successful');
      }, 50);
    }, 300);
    // return true;
  } catch (e) {
    console.log('Method 3 failed:', e);
  }

  // Cách 4: Force click với event chain
  try {
    setTimeout(() => {
      const events = ['mousedown', 'mouseup', 'click'];
      events.forEach((eventType, index) => {
        setTimeout(() => {
          const event = new MouseEvent(eventType, {
            bubbles: true,
            cancelable: true,
            view: window
          });
          el.dispatchEvent(event);
        }, index * 50);
      });
      console.log('Method 4: Event chain successful');
    }, 400);
    console.log('Element:', el);
    return true;
  } catch (e) {
    console.log('Method 4 failed:', e);
  }


  console.log('All click methods attempted');
  return false;
}

// 4. Vòng lặp kiểm tra
let checkInterval: NodeJS.Timeout;

const startAdDetection = () => {
  // Tìm với nhiều selector dự phòng vì YouTube hay đổi tên class
  const selectors = [
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button',
    'button.ytp-ad-skip-button'
  ];

  for (const selector of selectors) {
    const btn = queryShadow(selector);
    if (btn && isElementReady(btn)) {
      forceClick(btn);
      return; // Thoát ngay khi thành công
    }
  }
};

const skipAd = () => {
  const skipButton = document.querySelector('.ytp-skip-ad-button');
  if (skipButton && skipButton instanceof HTMLButtonElement) {
    console.log('Skip button found:', skipButton);

    if (currentSettings.skipDelay > 0) {
      setTimeout(() => {
        if (skipButton.isConnected) {
          forceClick(skipButton);
          console.log('Ad skipped after delay');
        }
      }, currentSettings.skipDelay * 1000);
    } else {
      forceClick(skipButton);
      console.log('Ad skipped immediately');
    }
    return true;
  }
  return false;
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SETTINGS_UPDATED') {
    currentSettings = message.settings;
    console.log('Settings updated:', currentSettings);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    startAdDetection();
  });
} else {
  startAdDetection();
}

// Bắt đầu detection loop
checkInterval = setInterval(() => {
  if (currentSettings.enabled && currentSettings.autoSkip) {
    startAdDetection();
  }
}, 500); // Kiểm tra mỗi 0.5 giây
