document.addEventListener('DOMContentLoaded', () => {
    const videoHere = document.getElementById('video-here');
    const videoName = document.getElementById('video-name');

    const myVideoName = 'rickroll.mp4';

    function loadVideo() {
        videoHere.innerHTML = `<video width="320" height="240" controls>
            <source src="/api/video/${myVideoName}" type="video/mp4">
            Your browser does not support the video tag.`;
        videoName.innerText = myVideoName;
    }

    loadVideo();
});