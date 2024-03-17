document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const verified = JSON.parse(localStorage.getItem('verified'));
    const logoutBtn = document.querySelector('.btn.btn-primary[type="Sign Out"]');
    const verifyBtn = document.querySelector('.btn.btn-primary[type="Verify"]');
    const name = document.querySelector('main h1');
    const box = document.querySelector('.box');

    name.innerHTML = localStorage.getItem('email-address');

    if (verified) {
        makeVerified();
    }

    verifyBtn.addEventListener('click', () => {
        localStorage.setItem('verified', true);
        setTimeout(() => {
            makeVerified();
        }, 5000);
    });

    function makeVerified() {
        verifyBtn.innerHTML = 'Verified';
        verifyBtn.disabled = true;
        box.innerHTML = `
                    <div>
                        <div class="top-of-box">
                            <h1>Name</h1>
                            <div class="edit-btn">
                                <button class="btn btn-primary" type="edit">Edit</button>
                            </div>
                        </div>
                        <div>
                            <div class="profile-img">
                                <img src="Pfp/profile.jpg" alt="________" height="200px" width="200px">
                                <p>
                                    Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed quia non numquam  eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="myvid-title">
                        <h1>My Videos</h1>
                        <span>
                            <a class="btn btn-primary" href="upload.html">Upload Video</a>
                        </span>
                    </div>
                    <div class="video-container" style="display: block">
                        <div class="video-block">
                            
                                <a href="video.html">
                                    <img src="Video_files/Thumbnails/video.jpg" alt="________" height="100px" width=auto>
                                </a>
                            
                            
                                <a href="video.html">***____Video____***</a>
                            
                        </div>
                        <div class="video-block">
                            
                                <a href="video.html">
                                    <img src="Video_files/Thumbnails/video.jpg" alt="________" height="100px" width=auto>
                                </a>
                            
                            
                                <a href="video.html">***____Video____***</a>
                            
                        </div>
                        <div class="video-block">
                            
                                <a href="video.html">
                                    <img src="Video_files/Thumbnails/video.jpg" alt="________" height="100px" width=auto>
                                </a>
                            
                            
                                <a href="video.html">***____Video____***</a>
                            
                        </div>
                        <div class="video-block">
                            
                                <a href="video.html">
                                    <img src="Video_files/Thumbnails/video.jpg" alt="________" height="100px" width=auto>
                                </a>
                            
                            
                                <a href="video.html">***____Video____***</a>
                            
                        </div>
                    </div>
                    `
    }

    editBtn.addEventListener('click', () => {
        //idk if I'll implement the profile page actually
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.setItem('verified', false);
        localStorage.setItem('loggedIn', false);
        window.location.href = 'main.html';
    });
});