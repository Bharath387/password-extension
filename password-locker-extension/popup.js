document.getElementById('saveButton').addEventListener('click', () => {
    const url = document.getElementById('url').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (url && username && password) {
      // Send the credentials to background.js for storage
      chrome.runtime.sendMessage(
        { action: "saveCredentials", url, username, password },
        (response) => {
          if (response.status === "saved") {
            alert('Credentials saved successfully!');
          }
        }
      );
    } else {
      alert('Please fill in all fields!');
    }
  });
  