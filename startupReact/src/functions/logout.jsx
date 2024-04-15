export async function Logout() {
    response = await fetch('/api/auth/logout', {
        method: 'DELETE'
    });
    if (response.status === 200) {
        return true;
    } else {
        console.log("Error fetching Logout: " + response.status);
        return false;
    }
}