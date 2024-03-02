document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('.edit-btn');
    const verified = JSON.parse(localStorage.getItem('verified'));

    if (verified) {
        makeVerified();
    }

    function makeVerified() {
        //we'll see?
    }

    editBtn.addEventListener('click', () => {
        //idk if I'll implement the profile page actually
    });
});