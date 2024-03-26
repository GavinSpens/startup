document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const pfpParent = document.getElementById('pfpParent');
    const name = document.getElementById('name');
    const description = document.getElementById('profile-description');
    var pfpLink;

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


    async function pfptoButton() {
        const pfpButton = document.createElement('button');
        pfpButton.setAttribute('id', 'pfpButton');
        pfpButton.innerHTML = 'Change Profile Picture';
        pfpLink = await getPfp();
        pfpButton.style.backgroundImage = `url(${pfpLink})`;
        pfpButton.style.backgroundSize = 'cover';
        pfpButton.style.backgroundPosition = 'center';
        pfpButton.style.height = '200px';
        pfpButton.style.width = '200px';
        pfpButton.classList.add('full-round', 'pfp-text');
        pfpParent.innerHTML = '';
        pfpParent.appendChild(pfpButton);
        pfpButton.addEventListener('click', updatePfp);
        return pfpButton;
    }

    editBtn.addEventListener('click', async () => {
        const nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('id', 'nameInput');
        nameInput.setAttribute('value', name.innerHTML);
        nameInput.classList.add('margin-20', 'input');
        nameInput.style = 'width: 50vw; height: 50px; font-size: 30px;';
        name.replaceWith(nameInput);

        const descriptionInput = document.createElement('textarea');
        descriptionInput.setAttribute('id', 'descriptionInput');
        let descriptionHTML = description.innerHTML;
        descriptionInput.innerHTML = descriptionHTML.replace(/<br>/g, '\n');
        descriptionInput.classList.add('margin-20', 'input');
        descriptionInput.style = 'width: calc(100vw - 270px); height: 240px; resize: none; border: padding: 10px; font-size: 1em;';
        description.replaceWith(descriptionInput);

        const pfpButton = await pfptoButton();

        const saveBtn = document.createElement('button');
        saveBtn.setAttribute('id', 'saveProfileBtn');
        saveBtn.innerHTML = 'Save';
        saveBtn.classList.add('btn', 'blue');
        editBtn.replaceWith(saveBtn);

        pfpButton.addEventListener('click', () => {
            updatePfp();
        });

        saveBtn.addEventListener('click', async () => {
            const newName = nameInput.value;
            let textareaInput = descriptionInput.value;
            let newDescription = textareaInput.replace(/\n/g, '<br>');
            await fetch('/api/profileName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newName })
            });
            await fetch('/api/profileDesc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newDescription })
            });
            nameInput.replaceWith(name);
            descriptionInput.replaceWith(description);
            saveBtn.replaceWith(editBtn);
            loadProfile();
        });
    });

    async function updatePfp() {
        try {
            // Get url of random image from picsum
            let response = await fetch('https://picsum.photos/200');
            pfpLink = response.url;

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
        try {
            let response = await fetch('/api/pfpLink', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            pfpLink = await response.json();
            pfpParent.innerHTML = `<img class="full-round" src="${pfpLink}" alt="Profile picture" height="200px" width="200px" id="pfp">`;
            console.log(`Got: ${pfpLink}`);
            // return await response.json();
        } catch (error) {
            console.error('Error fetching the pfp link:', error);
        } finally {
            return pfpLink;
        }
    }

    async function loadPfp() {
        pfpLink = await getPfp();
        if (!String(pfpLink).match(/^https:\/\/fastly\.picsum\.photos.*$/)) {
            updatePfp();
        }
    }

    async function loadDescription() {
        let response = await fetch('/api/profileDesc', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let description = await response.json();
        return description;
    }

    async function loadName() {
        let response = await fetch('/api/profileName', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let name = await response.json();
        return name;
    }

    async function loadProfile() {
        let newName = await loadName();
        let newDescription = await loadDescription();
        name.innerHTML = newName;
        if (newDescription !== 'NONE') {
            description.innerHTML = newDescription;
        }
        loadPfp();
    }
    loadProfile();
});