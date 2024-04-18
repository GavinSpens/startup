export function Upload(username, authState) {
    return (
        <div class="medium-dark text-light">
            <header>
                <nav class="round row-space-between font-20 dark border-bottom">
                    <a class="link font-30 header_wide left" href="index.html">
                        <img src="play_mark2.png" alt="Logo" height="50px" width="50px" />
                        Video Library
                    </a>
                    Upload Video
                    <span class="header_wide"></span>
                </nav>
            </header>
            <main class="container-fluid col">
                <input class="file-input" type="file" name="varVideo" accept=".mp4" />
                <label class="upload-label" for="varVideo">
                    <span>Video</span>
                    <span>Drag file here or browse for .mp4 file</span>
                    <span></span>
                </label>
                <input class="img-input" type="file" name="varThm" accept=".jpg, .jpeg, .png" />
                <label class="upload-thm-label" for="varThm">
                    <span>Thumbnail Image</span>
                    <span>Drag file here or browse for .jpg, .jpeg, or .png file</span>
                    <span></span>
                </label>
                <div class="col centered" style="margin-left:55%; width:50vw; height:fit-content;">
                    <input class="input" type="text" id="title" placeholder="Title..." />
                    <textarea class="input" rows={8} style="resize:none;" id="description" placeholder="Description..."></textarea>
                </div>
                <button class="btn blue" style="align-self:center;" id="upload">Upload</button>
            </main>
            <footer>
                    <button class="btn blue" id="login">Sign Out</button>
            </footer>
        </div>
    )
}