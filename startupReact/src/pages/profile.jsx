export function Profile(username, authState) {


    return (
        <div class="medium-dark text-light">
            <header>
                <nav class="round row-space-between font-20 dark border-bottom">
                    <a class="link font-30 header_wide left" href="index.html">
                        <img src="play_mark2.png" alt="Logo" height="50px" width="50px" />
                        Video Library
                    </a>
                    Profile
                    <span class="header_wide right">
                        <button class="btn blue" id="verify">Get Verified</button>
                    </span>
                </nav>
            </header>
            <main class="container-fluid" style="overflow-y: auto; height: calc(100vh - 152px);">
                <div class="row-space-between">
                    <h1 id="name" class="margin-20">Name</h1>
                    <button class="btn gray" id="editProfileBtn">Edit</button>
                </div>
                <div class="row-space-between">
                    <span id="pfpParent">
                        <img src="_" alt="Profile picture" height="200px" width="200px" id="pfp" />
                    </span>
                    <span style="width:100%">
                        <p id="profile-description" class="margin-20">
                            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem.
                        </p>
                    </span>
                </div>
                <h1 class="font-20 bold margin-20" id="videos_header" style="width: calc(100vw - 79px)"></h1>
                <div class="grid" id="videos">

                </div>
            </main>
            <footer>
                <div>
                    <button class="btn blue" id="login">Sign Out</button>
                </div>
            </footer>
        </div>
    )
}