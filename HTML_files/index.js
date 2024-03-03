document.addEventListener('DOMContentLoaded', () => {
    const logIn_btn1 = document.querySelector("button.btn.btn-primary[type='login']");
    const logIn_btn2 = document.querySelector("a.btn.btn-primary[type='login']");
    const navbar = document.querySelector(".container-fluid.navbar.fixed-top.navbar-dark");
    const wrapper = document.querySelector(".wrapper.login-button");
    const emailAddress = localStorage.getItem('email-address');
    const footerDiv = document.querySelector("footer div");
    let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

    if (loggedIn) {
        navbar.innerHTML = `<a class="navbar-brand" href="#"><img src="play.png" alt="Logo" height="50px" width="50px">Video Library</a>${emailAddress}<input type="text" class="Search" name="varSearch" placeholder="Search..."><button class="btn btn-primary" type="login" value="Login">Log Out</button>`;
        wrapper.innerHTML = '<a class="btn btn-primary" role="button" type="login">Log Out</a>';
        footerDiv.innerHTML = `<span class="text-reset">${emailAddress}</span>`
        
        const logOut_btn1 = document.querySelector("button.btn.btn-primary[type='login']");
        const logOut_btn2 = document.querySelector("a.btn.btn-primary[type='login']");
    
        logOut_btn1.addEventListener('click', logOut);
        logOut_btn2.addEventListener('click', logOut);
    }

    function logOut() {
        localStorage.setItem('loggedIn', false);
        navbar.innerHTML = `<a class="navbar-brand" href="#"><img src="play.png" alt="Logo" height="50px" width="50px">Video Library</a>Gavin Spens<input type="text" class="Search" name="varSearch" placeholder="Search..."><a href="https://github.com/GavinSpens/startup">GitHub Repository</a><button class="btn btn-primary" type="login" value="Login" >Login</button>`;
        wrapper.innerHTML = '<a class="btn btn-primary" href="login.html" role="button" type="login">Login</a>';
        footerDiv.innerHTML = `<span class="text-reset">Gavin Spens</span>`;
        window.location.href = 'index.html';
    }

    logIn_btn1.addEventListener('click', () => {
        loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        if (loggedIn) {
            logOut();
        } else {
            window.location.href = 'login.html';
        }
    });

    logIn_btn2.addEventListener('click', () => {
        loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
        if (loggedIn) {
            logOut();
        } else {
            window.location.href = 'login.html';
        }
    });
});