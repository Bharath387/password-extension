chrome.storage.local.get(window.location.href, function (data) {
  if (data[window.location.href]) {
      const credentials = data[window.location.href];
      const usernameField = document.querySelector('input[type="text"], input[type="email"]');
      const passwordField = document.querySelector('input[type="password"]');
      
      if (usernameField && passwordField) {
          usernameField.value = credentials.username;
          passwordField.value = decryptPassword(credentials.password);
          alert('Autofill completed');
      }
  }
});

function decryptPassword(encryptedPassword) {
  return atob(encryptedPassword);
}
