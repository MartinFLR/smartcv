// SmartCV Browser Extension - Background Service Worker

// Create context menu on extension install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'smartcv-capture',
    title: '📋 Send to SmartCV',
    contexts: ['selection'],
  });

  // Set default server URL
  chrome.storage.local.get(['serverUrl'], (result) => {
    if (!result.serverUrl) {
      chrome.storage.local.set({ serverUrl: 'http://localhost:3000' });
    }
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'smartcv-capture' && info.selectionText) {
    // Store the captured text
    chrome.storage.local.set(
      {
        capturedJobDesc: info.selectionText,
        capturedFrom: tab?.url || 'Unknown',
        capturedAt: new Date().toISOString(),
      },
      () => {
        // Open the popup by sending a message to the content script to show a notification
        chrome.tabs.sendMessage(tab.id, {
          type: 'SMARTCV_CAPTURED',
          text: info.selectionText,
        });

        // Also open popup (via action)
        chrome.action.openPopup?.();
      },
    );
  }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CAPTURED_TEXT') {
    chrome.storage.local.get(['capturedJobDesc', 'capturedFrom', 'capturedAt'], (result) => {
      sendResponse(result);
    });
    return true; // Keep channel open for async response
  }

  if (message.type === 'CLEAR_CAPTURED_TEXT') {
    chrome.storage.local.remove(['capturedJobDesc', 'capturedFrom', 'capturedAt'], () => {
      sendResponse({ success: true });
    });
    return true;
  }
});
