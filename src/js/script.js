const form = document.querySelector('.trial__form');
const inputs = document.querySelectorAll('.trial__input');
const email = document.querySelector('#email');
const errors = document.querySelectorAll('.trial_err');

form.addEventListener('submit', e => {
  for (let input of inputs) {
    if (input.value) {
      const regexMatch = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        email.value
      );
      if (!regexMatch) {
        e.preventDefault();
        email.nextElementSibling.classList.add('show');
      }
    } else {
      e.preventDefault();
      input.classList.add('trial__input-err');
      input.nextElementSibling.classList.add('show');
    }
  }
});
