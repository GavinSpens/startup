document.addEventListener('DOMContentLoaded', function() {
    const db_js = require('../database.js');
    const LoginButton = document.getElementById('Login');
    const ProfileButton = document.getElementById('Profile');
    const SubmitButton = document.getElementById('SubmitLogin');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    

    //PAGE NAVIGATION//
    LoginButton.addEventListener('click', () => {
        location.window.href = '/login';
    });

    ProfileButton.addEventListener('click', () => {
        location.window.href = '/profile';
    });


    //REGISTER//
    


    //LOGIN AND LOGOUT//
    async function Login(email, password) {
        const user = await db_js.getUser(email);
        if (user) {
            if (bcrypt.compare(password, user.password)) {
                return user;
            }
        }
        return null;
    }

    SubmitButton.addEventListener('click', () => {
        Login(emailInput.value, passwordInput.value);
    });
});