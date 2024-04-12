import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Main } from './main/main';
import { Login } from './login/login';
import { Register } from './register/register';
import { Upload } from './upload/upload';
import { Profile } from './profile/profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './app.css';

function App() {
    const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
    const [pageName, setPageName] = React.useState('Video Library');
    const currentAuthState = getAuthState();
    const [authState, setAuthState] = React.useState(currentAuthState);
    const navigate = useNavigate();

    async function getAuthState() {
        await fetch(`/api/auth/state`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                return(data.authState);
            })
            .catch(() => {
                return('none');
            });
    }

    function logout() {
        fetch(`/api/auth/logout`, {
            method: 'delete',
        })
            .catch(() => {
                // Logout failed. Assuming offline
            })
            .finally(() => {
                localStorage.removeItem('username');
                setUsername('');
                setAuthState('none');
                goto('');
            });
    }

    function goto(page) {
        if (page === '') {
            setPageName('Video Library');
        } else {
            setPageName(page);
        }
        navigate(page);
    }



    function header() {
        if (pageName === 'Video Library') {
            return <>
                {username}
                <input className="input" type="text" name="varSearch" placeholder="Search..." />
                <a className="link" href="https://github.com/GavinSpens/startup">GitHub Repository</a>
                <Button onClick={() => goto('')} className="btn blue">Login</Button>
            </>;
        } else {
            if (pageName === 'Login' || pageName === 'Register' || pageName === 'Upload') {
                return <>
                    {pageName}
                    <span className="header_wide"></span>
                </>;
            } else {
                return <>
                    {pageName}
                    <Button className="btn blue header_wide" onClick={() => goto('Register')} >Get Verified</Button>
                </>;
            }
        }
    }

    function footer() {
        if (pageName === 'Profile' || pageName === 'Upload') {
            return <Button onClick={() => logout()} className="btn blue">Sign Out</Button>;
        } else {
            return <span>{username}</span>;
        }
    }

    return (
        <BrowserRouter>
            <header className="round row-space-between font-20 dark border-bottom">
                <NavLink className="link font-30 left" to=''>
                    <img src="play_mark2.png" alt="Logo" height="50px" width="50px" />
                    Video Library
                </NavLink>
                {header()}
            </header>

            <Routes>
                <Route path='/' element={<Main username={username} authState={authState} />} />
                <Route path='/Login' element={
                    <Login username={username} authState={authState} onAuthChange={(username, authState) => {
                    setUsername(username);
                    setAuthState(authState);
                }} />} />
                <Route path='/Profile' element={<Profile username={username} authState={authState} />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Upload' element={<Upload username={username} authState={authState} />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="container-fluid gray dark">
                {footer()}
            </footer>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-medium centered'>404: Return to sender. Address unknown.</main>;
}

export default App;
