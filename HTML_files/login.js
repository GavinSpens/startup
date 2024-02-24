document.addEventListener('DOMContentLoaded', () => {

    //for testing only
    localStorage.setItem('email-address', 'test');
    localStorage.setItem('password', '1234');

    const emailInput = document.querySelector('.email-input');
    const emailAddress = localStorage.getItem('email-address');
    const passwordInput = document.querySelector('.password-input');
    const password = localStorage.getItem('password');
    const submitBtn = document.querySelector('.btn.btn-primary');
    const incorrect = document.querySelector('.incorrect');

    submitBtn.addEventListener('click', () => {
        if (password === passwordInput.value && emailAddress === emailInput.value) {
            localStorage.setItem('loggedIn', true);
            window.location.href = 'index.html';
        } else {
            incorrect.classList.add('visible');
        }
    });
});