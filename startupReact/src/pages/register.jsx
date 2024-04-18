export function Register() {

    return (
        <div class="medium-dark text-light">
            <header>
                <nav class="round row-space-between font-20 dark border-bottom">
                    <a class="link font-30 header_wide left" href="index.html">
                        <img src="play_mark2.png" alt="Logo" height="50px" width="50px" />
                        Video Library
                    </a>
                    Register
                    <span class="header_wide"></span>
                </nav>
            </header>
            <main class="column-space-around margin-20">
                <span>Email address: <input id="registerEmail" class="input" type="text" placeholder="Your email here..." /></span>
                <span class="height-20 red" id="email">
                </span>
                <span>Create Password: <input id="registerPassword" class="input" type="text" placeholder="Password..." /></span>
                <span class="height-20 red" id="password">
                </span>
                <span>Confirm Password: <input id="registerConfirm" class="input" type="text" placeholder="Retype Password..." /></span>
                <span class="height-20 red" id="confirm">
                </span>
                <div class="row-space-between margin-20" style="width: 25vw">
                    <button class="btn gray" id="cancelRegister">Cancel</button>
                    <button class="btn blue" id="submitRegister">Register</button>
                </div>
            </main>
            <footer>

            </footer>
        </div>
    )
}