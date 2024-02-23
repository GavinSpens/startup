document.addEventListener('DOMContentLoaded', () => {
    const uploadLabel = document.querySelector('.upload-label');
    const fileInput = document.querySelector('.file-input');
    const submitBtn = document.querySelector('.btn.btn-primary');
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.querySelector('.progress');
    const percent = document.querySelector('.percent');

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
        uploadVideo();
    });

    async function uploadVideo() {
        const video = fileInput.files[0];
        const formData = new FormData();
        formData.append('video', video);
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            window.location.href = '/upload';
        } catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
        }
    }

    submitBtn.addEventListener('change', () => {
        const file = submitBtn.files[0];
        const fileReader = new FileReader();
        if (fileReader === undefined) {
            return;
        }
        progressBar.style.opacity = 1;

        fileReader.onload = () => {
            const video = document.createElement('video');
            video.src = fileReader.result;
            video.onloadedmetadata = () => {
                const duration = video.duration;
                const interval = 1000;
                const step = 100 / (duration / interval);
                let percentValue = 0;
                let intervalId = setInterval(() => {
                    percentValue += step;
                    progress.style.width = percentValue + '%';
                    percent.textContent = percentValue.toFixed(0) + '%';
                    if (percentValue >= 100) {
                        clearInterval(intervalId);
                    }
                }, interval);
            };
        };
        fileReader.readAsDataURL(file);
    });

});