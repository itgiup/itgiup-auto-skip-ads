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
    return true;
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
    return true;
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
    return true;
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
    return true;
  } catch (e) {
    console.log('Method 4 failed:', e);
  }

  console.log('All click methods attempted');
  return false;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SETTINGS_UPDATED') {
    currentSettings = message.settings;
  }
});

// 4. MutationObserver để bắt skip button ngay khi xuất hiện
const observeSkipButton = () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        // Kiểm tra các node mới được thêm
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Tìm skip button trong node mới
            const selectors = [
              '.ytp-skip-ad-button',
              '.ytp-ad-skip-button',
              'button.ytp-ad-skip-button',
              'button[id*="skip-button"]'
            ];

            for (const selector of selectors) {
              const btn = (node as Element).querySelector(selector);
              if (btn && isElementReady(btn)) {
                console.log('Skip button detected via MutationObserver:', selector);
                forceClick(btn);
                return; // Thoát ngay khi thành công
              }
            }

            // Kiểm tra trong shadow DOM của node mới
            if ((node as any).shadowRoot) {
              for (const selector of selectors) {
                const btn = queryShadow(selector, (node as any).shadowRoot);
                if (btn && isElementReady(btn)) {
                  console.log('Skip button detected in Shadow DOM via MutationObserver:', selector);
                  forceClick(btn);
                  return;
                }
              }
            }
          }
        }
      }
    });
  });

  // Theo dõi toàn bộ document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'id', 'style'] // Theo dõi thay đổi class/id/style
  });

  console.log('MutationObserver started for skip button detection');
};

// Fallback: Kiểm tra toàn bộ document (cho các trường hợp đặc biệt)
const checkDocumentForSkipButton = () => {
  const selectors = [
    '.ytp-skip-ad-button',
    '.ytp-ad-skip-button',
    'button.ytp-ad-skip-button',
    'button[id*="skip-button"]'
  ];

  for (const selector of selectors) {
    const btn = queryShadow(selector);
    if (btn && isElementReady(btn)) {
      console.log('Skip button found via document check:', selector);
      forceClick(btn);
      return;
    }
  }
};

// Start detection
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    observeSkipButton();
    // Fallback interval (ít tốn tài nguyên hơn)
    setInterval(() => {
      if (currentSettings.enabled && currentSettings.autoSkip) {
        checkDocumentForSkipButton();
      }
    }, 2000); // Chỉ kiểm tra mỗi 2 giây
  });
} else {
  observeSkipButton();
  setInterval(() => {
    if (currentSettings.enabled && currentSettings.autoSkip) {
      checkDocumentForSkipButton();
    }
  }, 2000);
}
