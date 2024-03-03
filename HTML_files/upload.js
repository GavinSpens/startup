document.addEventListener('DOMContentLoaded', () => {
    const uploadLabel = document.querySelector('.upload-label');
    const fileInput = document.querySelector('.file-input');
    const submitBtn = document.querySelector('.btn.btn-primary');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const percent = document.querySelector('.percent');
    const logout = document.querySelector('footer button');

    submitBtn.disabled = false;
    logout.disabled = false;

    uploadLabel.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        uploadLabel.textContent = fileInput.files[0].name;
    });

    uploadLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadLabel.classList.add('dragover');
    });

    uploadLabel.addEventListener('dragleave', () => {
        uploadLabel.classList.remove('dragover');
    });

    uploadLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadLabel.classList.remove('dragover');
        fileInput.files = e.dataTransfer.files;
        uploadLabel.textContent = fileInput.files[0].name;
    });

    submitBtn.addEventListener('click', () => {
        if (fileInput.files.length) {
            submitBtn.disabled = true;
            logout.disabled = true;
            uploadVideo();
            updateProgressBar();
        }
    });

    async function uploadVideo() {
        //upload video
    }

    async function updateProgressBar() {
        progressBar.value = 0;
        progressBar.style.opacity = 1;
        while (progressBar.value < 100) {
            progressBar.value += 1;
            progress.style.width = `${progressBar.value}%`;
            percent.textContent = `Progress: ${progressBar.value}%`;

            await new Promise(r => setTimeout(r, 100));
        }
        finish();
    }

    async function finish() {
        percent.style.color = 'lightskyblue';
        percent.textContent = 'Upload complete';

        await new Promise(r => setTimeout(r, 5000));
        progressBar.style.opacity = 0;
        percent.style.color = 'white';
        progressBar.value = 0;
        progress.style.width = 0;
        percent.textContent = 'Progress: 0%';
        submitBtn.disabled = false;
        logout.disabled = false;
    }

    logout.addEventListener('click', async () => {
        localStorage.setItem('loggedIn', false);
        window.location.href = 'index.html';
    });
});