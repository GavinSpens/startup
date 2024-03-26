document.addEventListener('DOMContentLoaded', function() {
    const LoginButton = document.getElementById('login');
    const ProfileButton = document.getElementById('profile');
    const SubmitButton = document.getElementById('submitLogin');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    

    //PAGE NAVIGATION//
    try{
        LoginButton.addEventListener('click', () => {
            location.window.href = '/login';
        });
    } catch (e) {console.log(e);}

    try {
        ProfileButton.addEventListener('click', () => {
            location.window.href = '/profile';
        });
    } catch (e) {console.log(e);}


    //LOGIN AND LOGOUT//
    async function login(email, password) {
        if (getCookie('token') === null) {
            response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });
            window.location.href = '/profile.html';
        } else {
            response = await fetch('/api/auth/logout', {
                method: 'DELETE'
            });
            window.location.href = '/index.html';
        }
    }

    try {
        SubmitButton.addEventListener('click', () => {
            login(emailInput.value, passwordInput.value);
        });
    } catch (e) {console.log(e);}
});