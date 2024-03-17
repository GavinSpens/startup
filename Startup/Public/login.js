document.addEventListener('DOMContentLoaded', function() {
    const RegisterButton = document.getElementById('Register');

    RegisterButton.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
});