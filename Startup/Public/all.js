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
    const videos_header = document.getElementById('videos_header');
    const videos = document.getElementById('videos');
    const verify = document.getElementById('verify');

    //STATUS CHECK//
    async function loggedIn() {
        response = await fetch('/api/auth/loggedIn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
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

    async function setVerified(y_n) {
        response = await fetch('/api/auth/verified', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ y_n: y_n })
        });
        const text = await response.text();
        if (text === "true") {
            return true;
        } else if (text === "false") {
            return false;
        } else {
            console.log("Error fetching setVerified: " + text);
            return false;
        }
    }

    async function verified() {
        response = await fetch('/api/auth/verified', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const text = await response.text();
        if (text === "true") {
            return true;
        } else if (text === "false") {
            return false;
        } else {
            console.log("Error fetching verified: " + text);
            return false;
        }
    }
    try {
        verify.addEventListener('click', async () => {
            if (await verified()) {
                await setVerified("false");
            } else {
                await setVerified("true");
            }
            window.location.reload();
        });
    } catch (e) {console.log(e);}

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
            response = await fetch('/api/user/' + emailInput.value + '/' + passwordInput.value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { authenticated } = await response.json();
            if (authenticated) {
                await login(emailInput.value, passwordInput.value);
            } else if (authenticated === false) {
                message.classList.remove('hidden');
            } else {
                console.log("Error fetching login: " + authenticated);
            }
        });
    } catch (e) {console.log(e);}

    //UPDATE PAGE//
    async function update_by_user_status() {
        if (await loggedIn()) {
            try {
                namehere1.innerHTML = "Loading...";
                response = await fetch('/api/profileName', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const name = await response.text();
                namehere1.innerHTML = name;
                namehere2.innerHTML = name;
            } catch (e) {console.log(e);}

            try {
                LoginButton.innerHTML = "Logout";
            } catch (e) {console.log(e);}
            try {
                LoginButton2.innerHTML = "Logout";
            } catch (e) {console.log(e);}


            if (await verified()) {
                try {
                    verify.innerHTML = "Unverify";
                    videos_header.innerHTML = `
                    My Videos
                    <button class="btn blue" id='upload-page'>Add Video</button>
                    `;
                    videos_header.classList.add('row-space-between');
                    videos.innerHTML = `
                    
                    `;
                    document.getElementById('upload-page').addEventListener('click', () => {
                        window.location.href = '/upload.html';
                    });
                } catch (e) {console.log(e);}
            }
        } else {
            try {
                ProfileButton.parentElement.innerHTML = "";
            } catch (e) {console.log(e);}
        }
    }
    update_by_user_status();
});