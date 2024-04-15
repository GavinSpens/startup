import { Goto } from '../functions/goto.jsx';
import { Logout } from '../functions/logout.jsx';

export function Loginbtn(username) {
    if (!username || username === "Gavin Spens") {
        return (
            <button className="btn blue" onClick={() => Goto("login")}>Login</button>
        );
    }
    return (
        <button className="btn blue" onClick={() => Logout()}>Sign Out</button>
    );
}