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

export { verified };