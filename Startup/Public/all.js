document.addEventListener('DOMContentLoaded', function() {
    const LoginButton = document.getElementById('login');
    const LoginButton2 = document.getElementById('login2');
    const ProfileButton = document.getElementById('profile');
    const SubmitButton = document.getElementById('submitLogin');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const message = document.getElementById('message');
    const namehere1 = document.getElementById('namehere1');
    const namehere2 = document.getElementById('namehere2');

    //LOGGED IN CHECK//
    async function loggedIn() {
        response = await fetch('/api/auth/loggedIn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // return await response.json();
        const text = await response.text();
        if (text === "true") {
            return true;
        } else if (text === "false") {
            return false;
        } else {
            console.log("Error fetching loggedIn: " + text);
            return false;
        }
    }

    //PAGE NAVIGATION//
    try{
        LoginButton.addEventListener('click', async () => {
            if (await loggedIn()) {
                await login("",""); //logout
            } else {
                window.location.href = '/login.html';
            }
        });
    } catch (e) {console.log(e);}
    try {
        LoginButton2.addEventListener('click', async () => {
            if (await loggedIn()) {
                await login("",""); //logout
            } else {
                window.location.href = '/login.html';
            }
        });
    } catch (e) {console.log(e);}


    try {
        ProfileButton.addEventListener('click', () => {
            window.location.href = '/profile.html';
        });
    } catch (e) {console.log(e);}


    //LOGIN AND LOGOUT//
    async function login(email, password) {
        if ((email === "" && password === "") || (await loggedIn())) {
            response = await fetch('/api/auth/logout', {
                method: 'DELETE'
            });
            window.location.href = '/index.html';            
        } else {
            response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            });
            window.location.href = '/profile.html';
        }
    }

    try {
        SubmitButton.addEventListener('click', async () => {
            if (!emailInput.value || !passwordInput.value) {
                return;
            }
            response = await fetch('/api/user/' + emailInput.value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response === 'true') {
                await login(emailInput.value, passwordInput.value);
            } else {
                message.classList.remove('hidden');
            }
        });
    } catch (e) {console.log(e);}

    //UPDATE PAGE//
    async function update_by_login_state() {
        if (await loggedIn()) {
            response = await fetch('/api/profileName', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const name = await response.text();
            try {
                namehere1.innerHTML = name;
                namehere2.innerHTML = name;
            } catch (e) {console.log(e);}

            try {
                LoginButton.innerHTML = "Logout";
            } catch (e) {console.log(e);}
            try {
                LoginButton2.innerHTML = "Logout";
            } catch (e) {console.log(e);}

        } else {
            try {
                ProfileButton.parentElement.innerHTML = "";
            } catch (e) {console.log(e);}
        }
    }
    update_by_login_state();
});