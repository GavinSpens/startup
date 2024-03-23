document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const pfp = document.getElementById('pfp');
    const pfpParent = document.getElementById('pfpParent');

    // TESTING//
    // function register(email, password) {
    //     fetch('/api/auth/create', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ email: email, password: password })
    //     });
    // }
    // register('test', 'test');

    async function login(email, password) {
        response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        });
    }
    login('test', 'test');



    editBtn.addEventListener('click', () => {
        updatePfp();
    });

    async function updatePfp() {
        try {
            // Get url of random image from picsum
            let response = await fetch('https://picsum.photos/200');
            let pfpLink = response.url;

            // Send the url to the server to update the profile picture
            await fetch('/api/pfpLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pfpLink })
            });

            // Update the profile picture on the frontend
            pfpParent.innerHTML = `<img class="full-round" src="${pfpLink}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(`Updated link to: ${pfpLink}`);
        } catch (error) {
            console.error('Error fetching the rerouted URL:', error);
        }
    }

    async function getPfp() {
        let pfpLink;
        try {
            let response = await fetch('/api/pfpLink', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                // ,
                // body: JSON.stringify({ email })
            });
            pfpLink = await response.json();
            pfpParent.innerHTML = `<img class="full-round" src="${pfpLink}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(`Got: ${pfpLink}`);
        } catch (error) {
            console.error('Error fetching the pfp link:', error);
        } finally {
            return pfpLink;
        }
    }

    // if (pfp.parentElement.innerHTML === ``) {
    //     getPfp();
    // } else {
    //     updatePfp();
    // }


    // updatePfp();
    // getPfp();

    async function loadPfp() {
        let pfpLink = await getPfp();
        // if (pfpLink === (null || undefined || '')) {
        if (!String(pfpLink).match(/^https:\/\/fastly\.picsum\.photos.*$/)) {
            updatePfp();
        }
    }
    loadPfp();
});