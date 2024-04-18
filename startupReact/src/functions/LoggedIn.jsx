async function loggedIn() {
    let response = await fetch('/api/auth/loggedIn', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const contentType = response.headers.get("content-type");
    if (contentType && (contentType.indexOf("application/json") !== -1 || contentType.indexOf("text/plain") !== -1)) {
        const text = await response.text();
        if (text === "true") {
            return true;
        } else if (text === "false") {
            return false;
        } else {
            console.log("Error fetching loggedIn: " + text);
            return false;
        }
    } else {
        throw new Error(`Unexpected content type: ${contentType}`);
    }
}

export { loggedIn };