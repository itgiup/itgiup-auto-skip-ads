import { getSettings } from '../utils/storage';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Auto Skip Ads extension installed');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    handlePageLoad(tabId, tab.url);
  }
});

const handlePageLoad = async (tabId: number, url: string) => {
  try {
    const settings = await getSettings();
    if (settings.enabled) {
      chrome.tabs.sendMessage(tabId, {
        type: 'SETTINGS_UPDATED',
        settings
      });
    }
  } catch (error) {
    console.error('Error handling page load:', error);
  }
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_SETTINGS') {
    getSettings().then(settings => {
      sendResponse(settings);
    });
    return true;
  }
});
