document.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedIn');
    const logInOut_btn1 = document.querySelector("button.btn.btn-primary[type='login']");
    const logInOut_btn2 = document.querySelector("a.btn.btn-primary[type='login']");
    const navbar = document.querySelector(".container-fluid.navbar.fixed-top.navbar-dark");
    const wrapper = document.querySelector(".wrapper.login-button");
    const emailAddress = localStorage.getItem('email-address');
    const footerDiv = document.querySelector("footer div");

    if (loggedIn) {
        navbar.innerHTML = `<a class="navbar-brand" href="#"><img src="play.png" alt="Logo" height="50px" width="50px">Video Library</a>${emailAddress}<input type="text" class="Search" name="varSearch" placeholder="Search..."><button class="btn btn-primary" type="login" value="Login">Log Out</button>`;
        wrapper.innerHTML = '<a class="btn btn-primary" role="button" type="login">Log Out</a>';
        footerDiv.innerHTML = `<span class="text-reset">${emailAddress}</span>`
    }

    function logOut() {
        localStorage.setItem('loggedIn', false);
        navbar.innerHTML = `<a class="navbar-brand" href="#"><img src="play.png" alt="Logo" height="50px" width="50px">Video Library</a>Gavin Spens<input type="text" class="Search" name="varSearch" placeholder="Search..."><a href="https://github.com/GavinSpens/startup">GitHub Repository</a><button class="btn btn-primary" type="login" value="Login" >Login</button>`;
        wrapper.innerHTML = '<a class="btn btn-primary" href="login.html" role="button" type="login">Login</a>';
        footerDiv.innerHTML = `<span class="text-reset">Gavin Spens</span>`;
        window.location.href = 'index.html';
    }

    logInOut_btn1.addEventListener('click', () => {
        if (loggedIn) {
            logOut();
        } else {
            window.location.href = 'login.html';
        }
    });

    logInOut_btn2.addEventListener('click', () => {
        if (loggedIn) {
            logOut();
        } else {
            window.location.href = 'login.html';
        }
    });
});