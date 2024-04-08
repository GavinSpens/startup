document.addEventListener('DOMContentLoaded', () => {
    const videoInLabel = document.querySelector('.upload-label');
    const videoInput = document.querySelector('.file-input');
    const imgInLabel = document.querySelector('.upload-thm-label');
    const imgInput = document.querySelector('.img-input');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const submitBtn = document.getElementById('upload');
    const logout = document.getElementById('login');

    submitBtn.disabled = false;
    logout.disabled = false;

    videoInLabel.addEventListener('click', () => {
        videoInput.click();
    });

    videoInput.addEventListener('change', () => {
        videoInLabel.textContent = videoInput.files[0].name;
    });

    videoInLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        videoInLabel.classList.add('dragover');
    });

    videoInLabel.addEventListener('dragleave', () => {
        videoInLabel.classList.remove('dragover');
    });

    videoInLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        videoInLabel.classList.remove('dragover');
        videoInput.files = e.dataTransfer.files;
        videoInLabel.textContent = videoInput.files[0].name;
    });

    imgInLabel.addEventListener('click', () => {
        imgInput.click();
    });

    imgInput.addEventListener('change', () => {
        imgInLabel.textContent = imgInput.files[0].name;
    });

    imgInLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        imgInLabel.classList.add('dragover');
    });

    imgInLabel.addEventListener('dragleave', () => {
        imgInLabel.classList.remove('dragover');
    });

    imgInLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        imgInLabel.classList.remove('dragover');
        imgInput.files = e.dataTransfer.files;
        imgInLabel.textContent = imgInput.files[0].name;
    });

    submitBtn.addEventListener('click', () => {
        if (videoInput.files.length && imgInput.files.length && title.value && description.value) {
            submitBtn.disabled = true;
            logout.disabled = true;
            uploadVideo();
        }
    });
    async function uploadVideo() {
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('video', videoInput.files[0]);
        formData.append('thumbnail', imgInput.files[0]);

        response = await fetch('/api/video', {
            method: 'POST',
            body: formData
        });

        const data = await response;
        if (data.ok) {
            alert('Video uploaded successfully');
        } else if (data.status === 409) {
            alert('Video title already in use');
        } else {
            alert('Error uploading video');
        }

        finish();
    }

    async function finish() {
        submitBtn.disabled = false;
        logout.disabled = false;
    }
});