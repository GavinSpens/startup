document.addEventListener('DOMContentLoaded', () => {

    const registerBtn = document.querySelector('.btn.btn-primary[type="submit"]');
    const emailInput = document.querySelector('.email-password input[name="varEmail"]');
    const email_err = document.querySelector('.email');
    const cancelBtn = document.querySelector('.btn.btn-primary[type="cancel"]');
    
    email_err.innerHTML = '';
    email_err.style.color = '#c76974';

    registerBtn.addEventListener('click', () => {
        email_err.innerHTML = '';

        try {
            emailvalid();
            success();

        } catch (error) {
            if (error === 'no-email') {
                email_err.innerHTML = 'Please enter an email address';
            
            } else if (error === 'email') {
                email_err.innerHTML = 'Invalid email address';

            } else {
                console.log(`Unexpected error: ${error}`);
            }
        }
    });

    cancelBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    function emailvalid() {
        if (!emailInput.value) {
            throw('no-email');

        } else if (!/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]+$/.test(emailInput.value)) {
            throw('email');
        }
    }

    function success() {
        email_err.innerHTML = `Sending email to ${emailInput.value}...`;
        email_err.style.color = 'white';
        setTimeout( () => {
            email_err.innerHTML = "Sent!";
        },
        3000
        );
        setTimeout( () => {
            window.location.href = 'index.html';
        },
        4000
        );
    }
});