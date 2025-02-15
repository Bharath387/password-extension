// background.js

// Save credentials to Chrome storage
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "saveCredentials") {
      const { url, username, password } = request;
      
      chrome.storage.local.set({ [url]: { username, password } }, () => {
        sendResponse({ status: "saved" });
      });
      
      return true;  // To keep the message channel open for async response
    }
  
    // Retrieve credentials for a given URL
    if (request.action === "getCredentials") {
      chrome.storage.local.get([request.url], (result) => {
        if (result[request.url]) {
          sendResponse(result[request.url]);
        } else {
          sendResponse({ status: "not_found" });
        }
      });
      
      return true;
    }
  });
  