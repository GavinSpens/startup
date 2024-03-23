document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const pfp = document.getElementById('pfp');

    editBtn.addEventListener('click', () => {
        updatePfp();
    });

    async function updatePfp(email) {
        try {
            // Get url of random image from picsum
            let response = await fetch('https://picsum.photos/200');
            let reroutedUrl = response.url;

            // Send the url to the server to update the profile picture
            await fetch('/api/pfpLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, reroutedUrl })
            });

            // Update the profile picture on the frontend
            pfp.parentElement.innerHTML = `<img src="${reroutedUrl}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(reroutedUrl);
        } catch (error) {
            console.error('Error fetching the rerouted URL:', error);
        }
    }

    async function getPfp() {
        try {
            let response = await fetch('/api/pfpLink', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
                // ,
                // body: JSON.stringify({ email })
            });
            let pfpLink = await response.json();
            pfp.parentElement.innerHTML = `<img src="${pfpLink}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(pfpLink);
            return pfpLink;
        } catch (error) {
            console.error('Error fetching the pfp link:', error);
        }
    }

    // if (pfp.parentElement.innerHTML === ``) {
    //     getPfp();
    // } else {
    //     updatePfp();
    // }

    if (getPfp() === null) {
        updatePfp();
    }
});