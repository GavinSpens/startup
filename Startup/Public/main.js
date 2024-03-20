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
        navbar.innerHTML = ``;
        wrapper.innerHTML = ``;
        footer.innerHTML = ``;
        buttonsWrapper.innerHTML = ``;
        
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