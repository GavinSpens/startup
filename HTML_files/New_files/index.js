document.addEventListener('DOMContentLoaded', () => {

    const logIn_btn1 = document.getElementById("Login");
    const logIn_btn2 = document.getElementById("Login2");
    const navbar = document.querySelector("header nav");
    const wrapper = document.querySelector(".left-buttons .centered");
    const emailAddress = localStorage.getItem('email-address');
    const footer = document.querySelector("footer");
    let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    const buttonsWrapper = document.querySelector('div.column-space-between div.column-space-between');


    if (loggedIn) {
        navbar.innerHTML = `
        <a class="lightskyblue link" href="#">
            <img src="play_mark2.png" alt="Logo" height="50px" width="50px">
            Video Library
        </a>
        ${emailAddress}
        <input type="text" class="Search" placeholder="Search...">
        <a class="lightskyblue link" href="https://github.com/GavinSpens/startup">GitHub Repository</a>
        <button class="btn blue" id="LogOut">Log Out</button>
        `;
        wrapper.innerHTML = `
        <a class="btn blue" id="LogOut2">Log Out</a>
        `;
        footer.innerHTML = `
        <span class="container-fluid gray dark">${emailAddress}</span>
        `;
        buttonsWrapper.innerHTML = `
        <a class="btn blue" href="#" id="Home">Home</a>
        <a class="btn gray" href="#" id="Popular">Popular</a>
        <a class="btn gray" href="#" id="Recent">Recent</a>
        <a class="btn blue" href="profile.html" id="Profile">Profile</a>
        `;
        
        const logOut_btn1 = document.getElementById("LogOut");
        const logOut_btn2 = document.getElementById("LogOut2");
        const profile_btn = document.getElementById("Profile");
    
        logOut_btn1.addEventListener('click', () => {
            logOut();
        });
        logOut_btn2.addEventListener('click', () => {
            logOut();
        });
        profile_btn.addEventListener('click', () => {
            window.location.href = 'profile.html';
        });
    }

    function logOut() {
        localStorage.setItem('loggedIn', false);
        // navbar.innerHTML = `<a class="navbar-brand" href="#"><img src="play_mark2.png" alt="Logo" height="50px" width="50px">Video Library</a>Gavin Spens<input type="text" class="Search" name="varSearch" placeholder="Search..."><a href="https://github.com/GavinSpens/startup">GitHub Repository</a><button class="btn btn-primary" type="login" value="Login" >Login</button>`;
        // wrapper.innerHTML = '<a class="btn btn-primary" href="login.html" role="button" type="login">Login</a>';
        // footer.innerHTML = `<span class="text-reset">Gavin Spens</span>`;
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