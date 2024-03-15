document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const SubmitButton = document.getElementById('Submit');
    const RegisterButton = document.getElementById('Register');
    let emailAddress = '';
    let password = '';

    RegisterButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });

    SubmitButton.addEventListener('click', () => {
        emailAddress = emailInput.value;
        password = passwordInput.value;
        
    });
});