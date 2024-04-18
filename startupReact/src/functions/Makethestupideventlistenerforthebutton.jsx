import { WaitForElement } from './Waitforelement.jsx';

async function Makethestupideventlistenerforthebutton(name) {
    try {
        await WaitForElement(`${name}-like`);
        const like = document.getElementById(`${name}-like`);
        like.innerHTML = `
        <button class="full-round blue centered" style="height:40px; width:40px;" id="${name}-like-button">
            <img src="./like.png" alt="like" style="height:40px; width:40px;"/>
        </button>
        `;
        await WaitForElement(`${name}-like-button`);
        let button = document.getElementById(`${name}-like-button`);
        button.addEventListener('click', async () => {
            let response = await fetch('/api/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ video: name })
            });
            const text = await response.text();
            if (text === "true") {
                alert(`You liked ${name}`);
            } else {
                console.log("Error fetching like: " + text);
            }
        });
    } catch (e) {console.log(e);}
}

export { Makethestupideventlistenerforthebutton };