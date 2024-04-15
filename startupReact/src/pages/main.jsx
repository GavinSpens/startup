import { Loginbtn } from '../functions/loginbtn.jsx';
import { React } from 'react';

export function Main(username) {
    username = username.username;
    if (!username) {
        username = 'Gavin Spens'
    }
    console.log(username);

    return (
        <div className="medium-dark text-light full-width">
            <header>
                <nav className="round row-space-between font-20 dark border-bottom">
                    <a className="link font-30 left" href="#">
                        <img src="play_mark2.png" alt="Logo" height="50px" width="50px" />
                        Video Library
                    </a>
                    <span>{username}</span>
                    <input className="input" type="text" name="varSearch" placeholder="Search..." />
                    <a className="link" href="https://github.com/GavinSpens/startup">GitHub Repository</a>
                    <>{Loginbtn(username)}</>
                </nav>
            </header>
            <main className="row-space-between full-width">
                <div className="column-space-between medium rounder" style={{width: '160px', height: 'calc(100vh - 145px)', marginTop: '10px'}}>
                    <div className="column-space-around">
                        <button className="btn blue" href="index.html" id="home">Home</button>
                        <button className="btn gray" href="index.html" id="popular">Popular</button>
                        <button className="btn gray" href="index.html" id="recent">Recent</button>
                        <span><button className="btn gray" href="profile.html" id="profile">Profile</button></span>
                    </div>
                    <button className="btn blue" href="login.html" id="login2">Login</button>
                </div>
                <div id="videos-here" className="medium rounder grid font-20" style={{width: 'calc(100vw - 200px)', height: 'calc(100vh - 145px)', marginTop: '10px', overflowY: 'auto'}}>
                    {/* Add a parent element here */}
                    <div>
                        {/* Existing JSX elements */}
                    </div>
                </div>
            </main>
            <footer className="full-width gray dark">
                <>{username}</>
            </footer>
        </div>
    );
}