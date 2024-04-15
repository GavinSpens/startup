
const videos_header = document.getElementById('videos_header');
const videos = document.getElementById('videos');

async function Update_by_user_status() {
    if (await loggedIn()) {

        if (await verified()) {
            try {
                verify.innerHTML = "Unverify";
                videos_header.innerHTML = `
                My Videos
                <button class="btn blue" id='upload-page'>Add Video</button>
                `;
                videos_header.classList.add('row-space-between');
                videos.innerHTML = `
                
                `;
                document.getElementById('upload-page').addEventListener('click', () => {
                    Goto('/upload');
                });
            } catch (e) {console.log(e);}
        }
    } else {
        try {
            ProfileButton.parentElement.innerHTML = "";
        } catch (e) {console.log(e);}
    }
}

export { Update_by_user_status };