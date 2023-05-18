import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  await initializeStorageWithDefaults({});

  console.log('Extension successfully installed!');
});

chrome.runtime.onMessage.addListener(
  (message: string, sender, sendResponse) => {
    console.log(message);

    chrome.windows.getLastFocused(
      // Without this, window.tabs is not populated.
      { populate: true },
      function (window) {
        var foundSelected = false;
        for (var i = 0; i < window.tabs.length; i++) {
          // Finding the selected tab.
          if (window.tabs[i].active) {
            foundSelected = true;
          }
          // Finding the next tab.
          else if (foundSelected) {
            // Selecting the next tab.
            chrome.tabs.update(window.tabs[i].id, { active: true });
            return;
          }
        }
      },
    );
  },
);

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});
