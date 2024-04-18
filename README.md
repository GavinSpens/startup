# Startup
--------------------

## Startup Specification

### Elevator Pitch

This is a video library where verified users can upload instructional or informational videos. Users will be able to access the site without an account or by obtaining an unverified account, but will only be able to submit videos publicly by obtaining a verified account.

### Key Features

- "Like"
- Comments by signed-in users
- Comment removal by video submitter
- Flag inappropriate videos
- Google image search for thumbnails when uploading videos

### Using Technologies

1. **Authentication:** Users will be able to create an account and log in. They will also be able to verify their account in order to submit videos to the site. With an unverified account, users will be able to comment on and "Like" videos.
2. **Database Data:** Videos, comments, likes, and flags, as well as the associated user data will have to be stored in and retrieved from a database.
3. **Websocket Data:** Whenever another user posts a video, makes a comment, likes a video, or flags a video, everything will need to be updated in real time.

### Site Map

![Home Page](./SiteMapImages/Index.png)
![Login](./SiteMapImages/Login.png)
![Forgot Password](./SiteMapImages/Forgot.png)
![Verified Profile](./SiteMapImages/Verified.png)
![Unverified Profile](./SiteMapImages/Profile.png)
![Upload Video](./SiteMapImages/Upload.png)

---------------------------

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - Quite a few different pages with different functions. Located in the Startup folder.
- **Links** - Each page links together, except for the seperation between "verified" users, due to the outside interaction required.
- **Text** - There isn't really much text (some though,) but I think that's not really where the bulk of my project will be.
- **Images** - I have an image for my logo present on each page.
- **DB/Login** - Input box and submit button for login. Database will be the video library along with other information.
- **WebSocket** - Video posts will be represented as real-time interactions. If I have time, I may also include a comments feature or a "like" feature.

---------------------------

## JavaScript Deliverable

I added a bunch of JS code, making the pages more dynamic, and implementing functionality for users.
I apologize that this is submitted past when the site was at this point - about halfway into the semester, I realized that my HTML and CSS were awful, and needed to be entirely reworked in order to move forward, so I got a bit behind, and I just implemented most of the deliverables in one go.

- login - You can press the login button to go to the login page, and there's entry options, with a submit button.
- database - Login credentials are stored in the database, as well as profile picture reference data.
- WebSocket - 'like' button exists, which sends a notification to the user who owns the video.
- application logic - 'like' count increases, upload functionality, using s3 to fetch videos...

---------------------------

## Service deliverable

For this deliverable I added backend endpoints that receives profile information and image requests, and sends a profile picture

- Node.js/Express HTTP service - done!
- Static middleware for frontend - done!
- Calls to third party endpoints - done! - profile picture
- Backend service endpoints - Login data stored in database
- Frontend calls service endpoints - fetch

-----------------------------

## DB/Login deliverable

For this deliverable I log in users. I stored the data in the database.

- MongoDB Atlas database created - done!
- Stores data in MongoDB - done!
- User registration - Creates a new account in the database.
- Existing user - Doesn't create a new user, just logs in.
- Use MongoDB to store credentials - Stores both user and picture info.
- Restricts functionality - You cannot get user data or upload videos until you have logged in. This is restricted on the backend.

------------------------------

## WebSocket deliverable

For this deliverable I used webSocket to send a 'like' notification on the frontend in realtime.

- Backend listens for WebSocket connection - done!
- Frontend makes WebSocket connection - done!
- Data sent over WebSocket connection - done!
- WebSocket data displayed - sends a popup if the owner of the video is currently logged in when their video is 'liked'

---------------------------------

## React deliverable

For this deliverable, I was not able to get React working properly. After I put my code into React and converted it so I thought it would be compatible, it kept returning errors. As I said in the JS deliverable, I got behind about halfway through the class due to really bad HTML and CSS, so I spent some time redoing it... I just didn't know what I was doing at the very beginning. Anyways, I guess it caught up to me here, and I didn't quite have enough time to finish. I have the code all [here](./startupReact/), but I get that if it's not functional, it's not much use. I did put some work into it though.

- bundled using vite - done, but then undone? idk you can't tell anyways now
- functional react components - I honestly have no idea if the components are functional... I definitely attempted getting these
- router - I'm 90% sure that this one would be working but idk
- hooks - I was focused on just making it work first, so I didn't get to this at all
