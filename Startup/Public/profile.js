document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const pfp = document.getElementById('pfp');

    editBtn.addEventListener('click', () => {
        updatePfp();
    });

    async function updatePfp(email) {
        try {
            //Get url of random image from picsum
            let response = await fetch('https://picsum.photos/200');
            let reroutedUrl = response.url;

            //Send the url to the server to update the profile picture
            /*let response2 = */await fetch('/Pfp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, reroutedUrl })
            });
            // let pfpLink = await response2.json();
            // console.log(pfpLink);

            pfp.parentElement.innerHTML = `<img src="${reroutedUrl}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(reroutedUrl);
        } catch (error) {
            console.error('Error fetching the rerouted URL:', error);
        }
    }

    async function getPfp(email) {
        try {
            let response = await fetch('/pfpLink', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            let pfpLink = await response.json();
            pfp.parentElement.innerHTML = `<img src="${pfpLink}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(pfpLink);
        } catch (error) {
            console.error('Error fetching the pfp link:', error);
        }
    }

    if (pfp.parentElement.innerHTML !== ``) {
        updatePfp();
    } else {
        getPfp();
    }
});