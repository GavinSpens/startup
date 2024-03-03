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
        updateProgressBar();
    });

    async function uploadVideo() {
        //upload video
    }

    async function updateProgressBar() {
        while (progressBar.value < 100) {
            progressBar.value += 1;
            percent.textContent = progressBar.value + '%';
            await new Promise(r => setTimeout(r, 100));
        }
    }
});