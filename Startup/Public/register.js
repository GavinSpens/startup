document.addEventListener('DOMContentLoaded', () => {

    const registerBtn = document.querySelector('.btn.btn-primary[type="register"]');
    const emailInput = document.querySelector('.email-password input[name="varEmail"]');
    const password = document.querySelector('.email-password input[name="varPassword"]');
    const confirm = document.querySelector('.email-password input[name="varConfirm"]');
    const email_err = document.querySelector('.email');
    const password_err = document.querySelector('.password');
    const confirm_err = document.querySelector('.confirm');

    registerBtn.addEventListener('click', () => {
        email_err.innerHTML = '';
        password_err.innerHTML = '';
        confirm_err.innerHTML = '';

        try {
            emailvalid();
            passwordconditions();
            success();

        } catch (error) {
            if (error === 'no-email') {
                email_err.innerHTML = 'Please enter an email address';
            
            } else if (error === 'email') {
                email_err.innerHTML = 'Invalid email address';

            } else if (error === 'password') {
                password_err.innerHTML = 'Please enter a password';

            } else if (error === 'confirm') {
                confirm_err.innerHTML = 'Passwords do not match';

            } else if (error === 'length') {
                password_err.innerHTML = 'Password must be at least 8 characters long';

            } else if (error === 'uppercase') {
                password_err.innerHTML = 'Password must contain at least one uppercase letter';

            } else if (error === 'lowercase') {
                password_err.innerHTML = 'Password must contain at least one lowercase letter';
                
            } else if (error === 'symbol') {
                password_err.innerHTML = 'Password must contain at least one special character';

            } else if (error === 'number') {
                password_err.innerHTML = 'Password must contain at least one number';

            } else if (error === 'space') {
                password_err.innerHTML = 'Password must not contain any spaces';

            } else {
                console.log(`Unexpected error: ${error}`);
            }
        }
    });

    function emailvalid() {
        if (!emailInput.value) {
            throw('no-email');
        } else if (!/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]+$/.test(emailInput.value)) {
            throw('email');
        }
    }

    function success() {
        localStorage.setItem('email-address', emailInput.value);
        localStorage.setItem('password', password.value);
        localStorage.setItem('loggedIn', true);
        window.location.href = 'main.html';
    }

    let passwordconditions = () => {
        if (!password.value) {
            throw('password');

        } else if (password.value.length < 8) {
            throw('length');
        
        } else if (!/[A-Z]/.test(password.value)) {
            throw('uppercase');
        
        } else if (!/[a-z]/.test(password.value)) {
            throw('lowercase');

        } else if (!/[<>/\?\.!@#$%^&\*\(\)-\+=\[\]\{\}\\\|_]/.test(password.value)) {
            throw('symbol');

        } else if (!/[0-9]/.test(password.value)) {
            throw('number');
        
        } else if (/[\s]/.test(password.value)) {
            throw('space');
        
        } else if (password.value !== confirm.value) {
            throw('confirm');
        }
    }
});