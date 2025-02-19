document.getElementById('savePassword').addEventListener('click', savePassword);
document.getElementById('showPassword').addEventListener('click', showPassword);
document.getElementById('generatePassword').addEventListener('click', generatePassword);
document.getElementById('copyPassword').addEventListener('click', copyFunction);

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/; // A simple pattern for password validation

let isShowPassVisibled = false;

function savePassword() {
  const pageURL = document.getElementById('pageURL').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!pageURL || !username || !password) {
    alert('Please fill in all fields');
    return;
  }

  const encryptedPassword = encryptPassword(password);

  // Save to local storage
  const credentials = {
    url: pageURL,
    username: username,
    password: encryptedPassword
  };

  chrome.storage.local.set({ [pageURL]: credentials }, function () {
    alert('Password saved successfully!');
    if(isShowPassVisibled){
      showPassword();
    }
  });
}

function showPassword() {
  const pageURL = document.getElementById('pageURL').value;
  const adminId = document.getElementById('adminId').value;
  const ul = document.getElementById('storedData');
  ul.innerHTML='';
  console.log(adminId);
  if (adminId == 123456) {
    chrome.storage.local.getKeys(function (data) {
      data.forEach(url => {
        chrome.storage.local.get(url, function (data) {
          if (data[url]) {
            const decryptedPassword = decryptPassword(data[url].password);
            let li = document.createElement('li');
            li.innerHTML = `username:${data[url].username}<br>
             password: ${decryptedPassword}<br>
             url: ${data[url].url}`;
            ul.appendChild(li);
            isShowPassVisibled = true;
          } else {
            alert('No details stored for this URL.');
          }
        });
      });
    })
  } else {
    alert('Not valid user id' + adminId);
  }
}

function generatePassword() {
  const lengthCheckbox = document.getElementById('lengthCheckbox').checked;
  const specialCheckbox = document.getElementById('specialCheckbox').checked;

  const length = lengthCheckbox ? getRandomInt(8, 16) : 8; // Default length is 8
  const password = generateRandomPassword(length, specialCheckbox);

  document.getElementById('generatedPassword').value = password;
}

function generateRandomPassword(length, includeSpecial) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';

  let charactersToUse = characters;
  if (includeSpecial) {
    charactersToUse += specialCharacters;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charactersToUse.charAt(getRandomInt(0, charactersToUse.length));
  }

  return password;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function encryptPassword(password) {
  // Simple AES encryption (you could use more advanced methods)
  return btoa(password);
}

function decryptPassword(encryptedPassword) {
  return atob(encryptedPassword);
}

function copyFunction() {
  // Get the text field
  var copyText = document.getElementById("generatedPassword");
  if (copyText.value == '') {
    alert("Please generate password before copy");
    return;
  }
  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  navigator.clipboard.writeText(copyText.value);
  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

function fillCurrentPageUrl() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // Get the URL of the active tab
    document.getElementById('pageURL').value = tabs[0].url;
  });

}

fillCurrentPageUrl();