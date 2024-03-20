document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const pfp = document.getElementById('pfp');

    editBtn.addEventListener('click', () => {
        updatePfp();
    });

    async function updatePfp() {
        try {
            let response = await fetch('https://picsum.photos/200');
            let reroutedUrl = response.url;
            pfp.parentElement.innerHTML = ``;
            console.log(reroutedUrl);
        } catch (error) {
            console.error('Error fetching the rerouted URL:', error);
        }
    }

    updatePfp();
});