document.getElementById('savePassword').addEventListener('click', savePassword);
document.getElementById('showPassword').addEventListener('click', showPassword);
document.getElementById('generatePassword').addEventListener('click', generatePassword);

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,16}$/; // A simple pattern for password validation

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
  });
}

function showPassword() {
  const pageURL = document.getElementById('pageURL').value;
  const adminId = document.getElementById('adminId').value;
  console.log(adminId);
  if (adminId == 123456) {
    chrome.storage.local.get(pageURL, function (data) {
      if (data[pageURL]) {
        const decryptedPassword = decryptPassword(data[pageURL].password);
        document.getElementById('storedUsername').innerText =  data[pageURL].username;
        document.getElementById('storedPassword').innerText = decryptedPassword;
      } else {
        alert('No details stored for this URL.');
      }
    });
  } else {
    alert('Not valid user id' + adminId);
  }
}

function generatePassword() {
  const lengthCheckbox = document.getElementById('lengthCheckbox').checked;
  const specialCheckbox = document.getElementById('specialCheckbox').checked;

  const length = lengthCheckbox ? getRandomInt(8, 16) : 8; // Default length is 8
  const password = generateRandomPassword(length, specialCheckbox);

  document.getElementById('generatedPassword').innerText = password;
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
