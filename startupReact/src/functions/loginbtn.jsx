import { Goto } from './Goto.jsx';
import { Logout } from './Logout.jsx';
import { loggedIn } from './LoggedIn.jsx';

export function Loginbtn() {
    if (loggedIn()) {
        return (
            <button className="btn blue" onClick={() => Logout()}>Sign Out</button>
        );
    }
    return (
        <button className="btn blue" onClick={() => Goto("login")}>Login</button>
    );
}