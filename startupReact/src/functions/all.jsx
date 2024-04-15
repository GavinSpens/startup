import { login } from './Login.jsx';
import { loggedIn } from './LoggedIn.jsx';
import { verified } from './Verified.jsx';
import { SetVerified } from './SetVerified.jsx';
import { Update_by_user_status } from './Update_by_user_status.jsx';
import { Thisthing } from './Thisthing.jsx';
import { Goto } from './Goto.jsx';

export async function All_jsx() {
    const LoginButton = document.getElementById('login');
    const LoginButton2 = document.getElementById('login2');
    const ProfileButton = document.getElementById('profile');
    const SubmitButton = document.getElementById('submitLogin');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const message = document.getElementById('message');
    const verify = document.getElementById('verify');
    const RegisterButton = document.getElementById('register');


    try {
        verify.addEventListener('click', async () => {
            if (await verified()) {
                await SetVerified("false");
            } else {
                await SetVerified("true");
            }
            Goto('/profile');
        });
    } catch (e) {console.log(e);}

    try{
        LoginButton.addEventListener('click', async () => {
            if (await loggedIn()) {
                await login("",""); //logout
            } else {
                Goto('/login');
            }
        });
    } catch (e) {console.log(e);}
    try {
        LoginButton2.addEventListener('click', async () => {
            if (await loggedIn()) {
                await login("",""); //logout
            } else {
                Goto('/login');
            }
        });
    } catch (e) {console.log(e);}

    try {
        ProfileButton.addEventListener('click', () => {
            Goto('/profile');
        });
    } catch (e) {console.log(e);}

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

        RegisterButton.addEventListener('click', () => {
            Goto('register');
        });
    } catch (e) {console.log(e);}

    // Update_by_user_status();


    Thisthing();
}