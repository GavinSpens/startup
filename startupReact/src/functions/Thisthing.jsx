import { Makethestupideventlistenerforthebutton } from './Makethestupideventlistenerforthebutton.jsx';

async function Thisthing() {
    let videoNames = await fetch('/api/videoNames').then(res => res.json());
    await videoNames;
    for (var i = 0; i < videoNames.length; i++) {
        Makethestupideventlistenerforthebutton(videoNames[i]);
    }
}

export { Thisthing };