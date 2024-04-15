import { Goto } from './Goto.jsx';
import { Logout } from './Logout.jsx';

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