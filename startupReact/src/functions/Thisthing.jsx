import { Makethestupideventlistenerforthebutton } from './Makethestupideventlistenerforthebutton.jsx';

async function Thisthing() {
    try {
        let videoNames = await fetch('/api/videoNames').then(res => res.json());
        for (let i = 0; i < videoNames.length; i++) {
            Makethestupideventlistenerforthebutton(videoNames[i]);
        }
    } catch (error) {
        console.error("Error fetching video names:", error);
    }
}

export { Thisthing };