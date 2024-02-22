document.addEventListener('DOMContentLoaded', () => {
  const uploadLabel = document.querySelector('.upload-label');
  const fileInput = document.querySelector('.upload-video-btn');

  uploadLabel.addEventListener('click', () => {
    fileInput.click();
  });

//   fileInput.addEventListener('change', () => {
//     uploadLabel.textContent = fileInput.files[0].name;
//     localStorage.currentFile = fileInput.files[0];
//   });

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
        uploadLabel.textContent = `${fileInput.files[0].name}<img src="thumbnails/${fileInput.files[0].name.split('.')[0]}.png" alt="thumbnail" class="thumbnail" style="width: 100px; height: 100px; border-radius: 10px; margin-left: 10px;">`;
        localStorage.currentFile = fileInput.files[0];
        uploadVideo();
    });
});

async function uploadVideo() {
    const video = localStorage.currentFile;
    const formData = new FormData();
    formData.append('video', video);
    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    console.log(data);
    window.location.href = '/upload';
}