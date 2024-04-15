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

export { loggedIn };