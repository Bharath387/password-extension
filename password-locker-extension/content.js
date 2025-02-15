// content.js

// Detect when the page is fully loaded
window.addEventListener('load', () => {
    const currentUrl = window.location.href;
  
    // Request credentials for the current page's URL
    chrome.runtime.sendMessage(
      { action: "getCredentials", url: currentUrl },
      (response) => {
        if (response.username && response.password) {
          // Find the username and password input fields on the page
          const usernameField = document.querySelector('input[type="text"], input[name="username"], input[name="email"], input[type="email"]');
          const passwordField = document.querySelector('input[type="password"], input[name="password"]');
          
          // Autofill the form fields if found
          if (usernameField && passwordField) {
            usernameField.focus();
            usernameField.value = response.username;
            passwordField.focus();
            passwordField.value = response.password;
          }
        }
      }
    );
  });
  