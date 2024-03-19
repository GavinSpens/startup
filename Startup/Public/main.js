document.addEventListener('DOMContentLoaded', () => {

    const logIn_btn1 = document.getElementById("login");
    const logIn_btn2 = document.getElementById("login2");
    const navbar = document.querySelector("header nav");
    const wrapper = document.querySelector(".left-buttons .centered");
    const emailAddress = localStorage.getItem('email-address');
    const footer = document.querySelector("footer");
    let loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    const buttonsWrapper = document.querySelector('div.column-space-between div.column-space-between');


    if (loggedIn) {
        navbar.innerHTML = `
        <a class="white link" href="#">
            <img src="play_mark2.png" alt="Logo" height="50px" width="50px">
            Video Library
        </a>
        ${emailAddress}
        <input type="text" class="Search" placeholder="Search...">
        <button class="btn blue" id="logOut">Log Out</button>
        `;
        wrapper.innerHTML = `
        <button class="btn blue" id="logOut2">Log Out</button>
        `;
        footer.innerHTML = `
        ${emailAddress}
        `;
        buttonsWrapper.innerHTML = `
        <button class="btn blue" href="#" id="home">Home</button>
        <button class="btn gray" href="#" id="popular">Popular</button>
        <button class="btn gray" href="#" id="recent">Recent</button>
        <button class="btn blue" href="profile.html" id="profile">Profile</button>
        `;
        
        const logOut_btn1 = document.getElementById("logOut");
        const logOut_btn2 = document.getElementById("logOut2");
        const profile_btn = document.getElementById("profile");
    
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
        window.location.href = 'main.html';
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