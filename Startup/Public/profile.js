document.addEventListener('DOMContentLoaded', () => {
    const editBtn = document.getElementById('editProfileBtn');
    const pfp = document.getElementById('pfp');

    editBtn.addEventListener('click', () => {
        updatePfp();
    });

    async function updatePfp() {
        try {
            let response = await fetch('https://picsum.photos/200');
            let reroutedUrl = response.url;
            pfp.parentElement.innerHTML =
            `<img class="rounder" src="${reroutedUrl}" alt="Profile picture" height="200px" width="200px" id="pfp">
            <p>
                ${"Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed quia non numquam  eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?"}
            </p>`;
            console.log(reroutedUrl);
        } catch (error) {
            console.error('Error fetching the rerouted URL:', error);
        }
    }

    updatePfp();
});