async function SetVerified(y_n) {
    let response = await fetch('/api/auth/verified', {
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
        console.log("Error fetching SetVerified: " + text);
        return false;
    }
}

export { SetVerified };