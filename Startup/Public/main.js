document.addEventListener('DOMContentLoaded', () => {
    const videosHere = document.getElementById('videos-here');

    const myVideoName = 'rickroll';

    function waitForElement(id) {
        return new Promise((resolve, reject) => {
            // Create a MutationObserver to watch for changes in the DOM
            const observer = new MutationObserver((mutations, observer) => {
                // If the element exists in the document, resolve the promise and disconnect the observer
                if (document.getElementById(id)) {
                    resolve(document.getElementById(id));
                    observer.disconnect();
                }
            });
            // Start observing the document with the configured parameters
            observer.observe(document, { childList: true, subtree: true });
        });
    }

    function playVideo(element, videoHere, myVideoName, videoName) {
        videoHere.innerHTML = `
        <video class="pointer black-background rounder" id="${myVideoName}-video" width="320" height="240" controls>
            <source src="/api/video/${myVideoName}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        `;
        videoName.innerHTML = myVideoName;

        // Play video in full screen
        waitForElement(`${myVideoName}-video`).then((element) => {
            element.play();
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) { // Firefox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) { // IE/Edge
                element.msRequestFullscreen();
            }
        });
    }

    function loadVideo(myVideoName, videoHere, videoName) {
        videoHere.innerHTML = `
        <img id="${myVideoName}-img" width="320" height="240" src="/api/thumbnail/${myVideoName}" alt="thumbnail" class="rounder pointer"/>
        `;
        videoName.innerHTML = `
        <a class="link pointer" style="color:white;" onMouseOver="this.style.color='lightskyblue'" onMouseOut="this.style.color='white'" id="${myVideoName}-link">
            ${myVideoName}
        </a>
        `;
        
        const id = `${myVideoName}-img`;

        waitForElement(id).then(thisisstupidthatIneedthis.bind(null, document.getElementById(id), videoHere, myVideoName, videoName));
    }

    function thisisstupidthatIneedthis(element, videoHere, myVideoName, videoName) {
        element.addEventListener('click', playVideo.bind(null, element, videoHere, myVideoName, videoName));
    }

    //add 'uhh' and myVideoName to an empty array
    var videoNames = [];
    videoNames.push(myVideoName);
    videoNames.push('uhh');

    //replace the innerHTML of videosHere with the videos
    let html = '';
    for (var i = 0; i < videoNames.length; i++) {
        html += `
        <div class="video-container">
            <div id="${videoNames[i]}-here" class="video-here"></div>
            <div id="${videoNames[i]}-name" class="video-name"></div>
        </div>
        `;
    }
    videosHere.innerHTML = html;
    for (var i = 0; i < videoNames.length; i++) {
        const videohere = document.getElementById(`${videoNames[i]}-here`);
        const videoname = document.getElementById(`${videoNames[i]}-name`);
        loadVideo(videoNames[i], videohere, videoname);
    }
});