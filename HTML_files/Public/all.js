document.addEventListener('DOMContentLoaded', function() {
    const LoginButton = document.getElementById('Login');
    const ProfileButton = document.getElementById('Profile');

    let userName = '';
    let password = '';
    let hostname = '';    
    
    LoginButton.addEventListener('click', () => {
        location.window.href = '/login';
    });

    ProfileButton.addEventListener('click', () => {
        location.window.href = '/profile';
    });

    function Mongo (f) {
        const { MongoClient } = require('mongodb');
        const url = `mongodb+srv://${userName}:${password}@${hostname}`;
        const client = new MongoClient(url);
        client.connect(err => {
            const collection = client.db("test").collection("devices");

            // ... perform actions on the DB collection
            f();

            client.close();
        });
    }
});