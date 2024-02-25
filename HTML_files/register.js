document.addEventListener('DOMContentLoaded', () => {

    const registerBtn = document.querySelector('.btn.btn-primary[type="register"]');
    const emailInput = document.querySelector('.email-password input[name="varEmail"]');
    const password = document.querySelector('.email-password input[name="varPassword"]');
    const confirm = document.querySelector('.email-password input[name="varConfirm"]');

    registerBtn.addEventListener('click', () => {
        if (password.value === confirm.value) {
            localStorage.setItem('email-address', emailInput.value);
            localStorage.setItem('password', password.value);
            localStorage.setItem('loggedIn', true);
            window.location.href = 'index.html';
        }
    });
});