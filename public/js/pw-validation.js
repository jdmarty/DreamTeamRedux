/* eslint-disable require-jsdoc */
/* eslint-disable no-use-before-define */
const passwordInput = document.querySelector("#password-signup");
const status = document.querySelector("#pw-bulletin");

passwordInput.addEventListener("input", displayStatus);

displayStatus();

function displayStatus() {
  const validate = validatePassword(passwordInput.value);
  console.log(validate);

  status.innerHTML = "";
  validate.forEach((validate) => {
    if (!validate) return;
    const message = document.createElement("div");
    message.setAttribute("class", "col-2 pw-checks");
    message.innerText = validate.message;
    status.appendChild(message);
  });
}

function validatePassword(password) {
  const validate = [];
  validate.push(validateLength(password));
  validate.push(validateLowercase(password));
  validate.push(validateUppercase(password));
  validate.push(validateNumbers(password));
  validate.push(validateSpecial(password));
  return validate;
}

function validateLength(password) {
  const length = password.length;

  if (length <= 8) {
    return {
      message: "8 Char",
    };
  }

  if (length >= 8) {
    return {
      message: "",
    };
  }
}

function validateLowercase(password) {
  return validateCharacters(password, /[a-z]/g, "a-z");
}

function validateUppercase(password) {
  return validateCharacters(password, /[A-Z]/g, "A-Z");
}

function validateNumbers(password) {
  return validateCharacters(password, /[0-9]/g, "123");
}

function validateSpecial(password) {
  return validateCharacters(password, /[^0-9a-zA-Z\s]/g, "!@#$");
}

function validateCharacters(password, regex, type) {
  const match = password.match(regex) || [];

  if (match.length === 0) {
    return {
      message: `${type}`,
    };
  }
}

