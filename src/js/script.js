const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const form = document.querySelector('.trial__form');

const isRequired = value => (value === '' ? false : true);

const isEmailValid = email => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

const checkFirstName = () => {
  let valid = false;
  const firstName = firstNameInput.value.trim();

  if (!isRequired(firstName)) {
    showError(firstNameInput, 'First Name canot be empty');
  } else {
    showSuccess(firstNameInput);
    valid = true;
  }

  return valid;
};

const checkLastName = () => {
  let valid = false;
  const lastName = lastNameInput.value.trim();

  if (!isRequired(lastName)) {
    showError(lastNameInput, 'First Name canot be empty');
  } else {
    showSuccess(lastNameInput);
    valid = true;
  }

  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = emailInput.value.trim();
  if (!isRequired(email)) {
    showError(emailInput, 'Email cannot be empty');
  } else if (!isEmailValid(email)) {
    showError(emailInput, 'Email is not valid');
  } else {
    showSuccess(emailInput);
    valid = true;
  }

  return valid;
};

const checkPassword = () => {
  let valid = false;

  const password = passwordInput.value.trim();

  if (!isRequired(password)) {
    showError(passwordInput, 'Password cannot be empty');
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordInput,
      'Password must have at least 8 characters that include 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)'
    );
  } else {
    showSuccess(passwordInput);
    valid = true;
  }

  return valid;
};

const isPasswordSecure = password => {
  const regex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return regex.test(password);
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');

  const error = formField.querySelector('p');
  error.textContent = message;
  error.classList.add('show');
};

const showSuccess = input => {
  const formField = input.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');

  const error = formField.querySelector('p');
  error.textContent = '';
  error.classList.remove('show');
};

form.addEventListener('submit', e => {
  let isValidFirstName = checkFirstName();
  let isValidLastName = checkLastName();
  let isValidEmail = checkEmail();
  let isValidPassword = checkPassword();

  let isValidForm =
    isValidFirstName && isValidLastName && isValidEmail && isValidPassword;

  if (!isValidForm) {
    e.preventDefault();
  }
});

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  'input',
  debounce(function (e) {
    switch (e.target.id) {
      case 'firstName':
        checkFirstName();
        break;
      case 'lastName':
        checkLastName();
        break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
    }
  })
);

//old simple error script

// const form = document.querySelector('.trial__form');
// const inputs = document.querySelectorAll('.trial__input');
// const email = document.querySelector('#email');

// form.addEventListener('submit', e => {
//   for (let input of inputs) {
//     if (input.value) {
//       const regexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
//         email.value
//       );
//       if (!regexMatch) {
//         e.preventDefault();
//         email.nextElementSibling.classList.add('show');
//         email.nextElementSibling.nextElementSibling.classList.add('show');
//       }
//     } else {
//       e.preventDefault();
//       input.classList.add('trial__input-err');
//       input.nextElementSibling.classList.add('show');
//       input.nextElementSibling.nextElementSibling.classList.add('show');
//     }
//   }
// });
