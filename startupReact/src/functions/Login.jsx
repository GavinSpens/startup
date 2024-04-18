import { Goto } from './Goto.jsx';

async function login(email, password) {
    if ((email === "" && password === "") || (await loggedIn())) {
        let response = await fetch('/api/auth/logout', {
            method: 'DELETE'
        });
        Goto('/index');
    } else {
        let response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
        Goto('/profile');
    }
}

export { login };