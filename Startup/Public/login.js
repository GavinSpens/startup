document.addEventListener('DOMContentLoaded', function() {
    const RegisterButton = document.getElementById('register');

    RegisterButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
});