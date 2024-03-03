document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.querySelector('.edit-btn');
    const verified = JSON.parse(localStorage.getItem('verified'));
    const logoutBtn = document.querySelector('.btn.btn-primary[type="Sign Out"]');
    const verifyBtn = document.querySelector('.btn.btn-primary[type="Verify"]');
    const name = document.querySelector('main h1');

    name.innerHTML = localStorage.getItem('email-address');

    if (verified) {
        makeVerified();
    }

    verifyBtn.addEventListener('click', () => {
        localStorage.setItem('verified', true);
        setTimeout(() => {
            makeVerified();
        }, 5000);
    });

    function makeVerified() {
        verifyBtn.innerHTML = 'Verified';
        verifyBtn.disabled = true;
    }

    editBtn.addEventListener('click', () => {
        //idk if I'll implement the profile page actually
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.setItem('verified', false);
        localStorage.setItem('loggedIn', false);
        window.location.href = 'index.html';
    });
});