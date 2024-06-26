function Web_Socket() {
    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    socket.onopen = (event) => {
        console.log('WebSocket opened:', event);

        socket.onmessage = async (event) => {
            const text = await event.data;
            const received = JSON.parse(text);
            if (received.msg === 'connected') {
                await fetch('/api/email', {
                    method: 'GET',
                    credentials: 'include' 
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    const username = (data) ? data : null;
                    sendMsg('connected', username);
                })
                .catch(e => {
                    console.error('Error fetching /api/email:', e);
                });
            } else if (received.type === 'bounce') {
                sendMsg(received.msg, received.name);
            } else {
                msg(received.name, received.msg);
            }
        };

        socket.onclose = (event) => {
            console.error('WebSocket closed:', event);
        };

        async function sendMsg(msg, name) {
            if (!name) {
                name = await fetch('/api/email').then(res => res.text());
            }
            socket.send(JSON.stringify({ msg, name }));
        }

        async function msg(name, msg) {
            const [action, video, number] = msg.split(' ');
            if (action === 'like') {
                if (number === '1') {
                    alert(`${name} liked your video!\n\'${video}\' has ${number} like`);
                } else {
                    alert(`${name} liked your video!\n\'${video}\' has ${number} likes`);
                }
            }
        }
    }
}

export { Web_Socket };