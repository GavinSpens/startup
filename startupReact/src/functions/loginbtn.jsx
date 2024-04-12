import { goto } from '../functions/goto.jsx';

export function loginbtn(username) {
    if (!username || username === "Gavin Spens") {
        return (
            <button className="btn blue" onClick={() => goto("login")}>Login</button>
        );
    }
    return (
        <button className="btn blue" onClick={() => logout()}>Sign Out</button>
    );
}