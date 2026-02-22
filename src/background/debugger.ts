// Chrome Debugger Protocol for trusted clicks
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  
  const target = { tabId: tab.id };
  
  try {
    // Attach debugger
    await chrome.debugger.attach(target, "1.3");
    
    // Lấy vị trí nút Skip
    const [rect] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const btn = document.querySelector('.ytp-skip-ad-button') || 
                   document.querySelector('.ytp-ad-skip-button') ||
                   document.querySelector('button[id*="skip-button"]');
        if (!btn) return null;
        const r = btn.getBoundingClientRect();
        return { 
          x: Math.round(r.left + r.width/2), 
          y: Math.round(r.top + r.height/2),
          width: r.width,
          height: r.height
        };
      }
    });
    
    if (rect?.result) {
      const { x, y, width, height } = rect.result;
      
      console.log('Button found at:', { x, y, width, height });
      
      // Move mouse to button
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mouseMoved", 
        x, y,
        modifiers: 0
      });
      
      // Small delay for realism
      await new Promise(resolve => setTimeout(resolve, 50));
      
      // Mouse down
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mousePressed", 
        button: "left", 
        x, y,
        clickCount: 1,
        modifiers: 0
      });
      
      // Small delay
      await new Promise(resolve => setTimeout(resolve, 30));
      
      // Mouse up (complete click)
      await chrome.debugger.sendCommand(target, "Input.dispatchMouseEvent", {
        type: "mouseReleased", 
        button: "left", 
        x, y,
        clickCount: 1,
        modifiers: 0
      });
      
      console.log("✅ Trusted click dispatched via CDP");
      
      // Verify click success
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const [verify] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const btn = document.querySelector('.ytp-skip-ad-button') || 
                     document.querySelector('.ytp-ad-skip-button') ||
                     document.querySelector('button[id*="skip-button"]');
          return btn ? btn.textContent : 'Button not found';
        }
      });
      
      if (verify?.result) {
        console.log('Button after click:', verify.result);
      }
    } else {
      console.log('❌ Skip button not found');
    }
    
  } catch (error) {
    console.error('Debugger error:', error);
  } finally {
    // Luôn detach để tránh ảnh hưởng trải nghiệm người dùng
    try {
      await chrome.debugger.detach(target);
    } catch (e) {
      // Ignore detach errors
    }
  }
});
