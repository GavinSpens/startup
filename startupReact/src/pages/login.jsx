export async function Login() {


    return (
        <body class="medium-dark text-light">
            <header>
                <nav class="round row-space-between font-20 dark border-bottom">
                    <a class="link font-30 header_wide left" href="index.html">
                        <img src="play_mark2.png" alt="Logo" height="50px" width="50px" />
                        Video Library
                    </a>
                    Login
                    <span class="header_wide"></span>
                </nav>
            </header>
            <main class="column-space-around margin-20" style="height:calc(100vh - 200px);">
                <span>Email address: <input class="input" type="text" id="email-input" placeholder="Your email here..." /></span>
                <span>Password: <input id="password-input" class="password input" type="text" placeholder="Password..." /></span>
                <span class="hidden red" id="message">Your email or password is incorrect.</span>
                <button class="btn blue" id="submitLogin">Login</button>
                <div class="column-space-between">
                    Don't have an account?
                    <button class="btn gray margin-20" id="register">Register</button>
                </div>
            </main>
            <footer>

            </footer>
        </body>
    )
}