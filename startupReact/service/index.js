const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');
const VL = require('./videofetch.js');
const app = express();
const multer = require('multer');
const upload = multer();

const authCookieName = 'token';

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    // setAuthCookie(res, user.token);
    // res.send({ id: user._id });
    setAuthCookie(res, user.token);
    res.send( user );
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      // setAuthCookie(res, user.token);
      // res.send({ id: user._id });
      setAuthCookie(res, user.token);
      res.send( user );
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//getLoggedIn
apiRouter.get('/auth/loggedIn', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.send(true);
    return;
  }
  res.send(false);
});

//getVerified
apiRouter.get('/auth/verified', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  const userverified = user.verified;
  if (userverified) {
    res.send(true);
    return;
  }
  res.send(false);
});

//SetVerified
apiRouter.post('/auth/verified', async (req, res) => {
  const { y_n } = req.body;
  response = DB.verify(req.cookies.token, y_n === 'true');
  res.send(response);
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email/:password', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    const password = req.params.password;
    res.send({ email: user.email, authenticated: token === user.token || await bcrypt.compare(password, user.password)});
    return;
  }
  res.send({ authenticated: false });
});

// GetVideo
apiRouter.get('/video/:name', async (req, res) => {
  try {
    const data = await VL.getVideo(req.params.name);
    console.log(data); // Log the data
    if (data) {
      res.writeHead(200, {
        'Content-Type': 'video/mp4'
      });

      data.pipe(res).on('error', err => {
        console.error(err); // Log any errors from the pipe method
        res.status(500).send('Error streaming video');
      });
    } else {
      res.status(404).send(null);
    }
  } catch (err) {
    console.error(err); // Log any errors from VL.getVideo
    res.status(500).send('Error fetching video');
  }
});

// GetThumbnail
apiRouter.get('/thumbnail/:name', async (req, res) => {
  const data = await VL.getThm(req.params.name);
  if (data) {
    res.writeHead(200, {
      'Content-Type': 'image/jpeg'
    });

    data.pipe(res);
  } else {
    res.status(404).send(null);
  }
});

// GetDescription
apiRouter.get('/description/:name', async (req, res) => {
  const data = await VL.getDesc(req.params.name);
  if (data) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });

    data.pipe(res);
  } else {
    res.status(404).send(null);
  }
});

// GetVideoNames
apiRouter.get('/videoNames', async (_req, res) => {
  res.json(await VL.getVideoNames());
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

//getEmail
secureApiRouter.get('/email', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.send(user.email);
  } else {
    res.status(404).json(null);
  }
});


//getName
secureApiRouter.get('/profileName', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.send(user.name);
  } else {
    res.status(404).json(null);
  }
});

// UpdateName
secureApiRouter.post('/profileName', async (req, res) => {
  const { newName } = req.body;
  const updated = await DB.updateName(req.cookies.token, newName);
  if (updated) {
    res.json({ message: 'Name updated successfully' });
  } else {
    res.status(404).json(null);
  }
});

// GetProfileDescription
secureApiRouter.get('/profileDesc', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.json(user.description);
  } else {
    res.status(404).json(null);
  }
});

// updateDescription
secureApiRouter.post('/profileDesc', async (req, res) => {
  const { newDescription } = req.body;
  const updated = await DB.updateDescription(req.cookies.token, newDescription);
  if (updated) {
    res.json({ message: 'Description updated successfully' });
  } else {
    res.status(404).json(null);
  }
});

// GetProfilePic
secureApiRouter.get('/pfpLink', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.json(user.pfpLink);
  } else {
    res.status(404).json(null);
  }
});

// UpdateProfilePic
secureApiRouter.post('/pfpLink', async (req, res) => {
  const { pfpLink } = req.body;
  const updated = await DB.updatePfp(req.cookies.token, pfpLink);
  if (updated) {
    res.json({ message: 'Profile picture updated successfully' });
  } else {
    res.status(404).json(null);
  }
});

// UploadVideo
secureApiRouter.post('/video', upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res) => {
  // check if video name is already in use
  const videoNamesResponse = await VL.getVideoNames();
  const names = videoNamesResponse.Contents.map(obj => obj.Key);
  if (names.includes(req.body.title)) {
    res.status(409).json({ message: 'Video title already in use' });
    return;
  }
  const username = await DB.getUserByToken(req.cookies.token).email;
  const uploaded = await VL.uploadVideo(username, req.body.title, req.body.description, req.files.video[0], req.files.thumbnail[0]);
  if (uploaded) {
    res.json({ message: 'Video uploaded successfully' });
  } else {
    res.status(404).json(null);
  }
});

// likeVideo
secureApiRouter.post('/like', async (req, res) => {
  const existingConnection = connections[connection.id];
  if (!existingConnection) {
    res.status(404).send('No websocket connection');
    return;
  }
  let toname = await VL.getVideoOwner(req.body.video);
  let ws = connections[connection.id].ws;
  ws.send(JSON.stringify({ type: 'bounce', msg: `${req.body.video}, ${toname}`, name: connection.id }));

  
  res.send(true);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).json({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'none',
  });
}

server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// websocket stuff

const { WebSocketServer } = require('ws');

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections
let connections = {};
var connection = {id: null, alive: false, ws: null};
wss.on('connection', (ws) => {
  ws.send(JSON.stringify({msg: 'connected'}));
  ws.on('message', async function message(data) {
    data = JSON.parse(data);
    let fromname = data.name;
    if (data.msg === 'connected') {
      if (!fromname) {
        fromname = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      }
      connection = { id: fromname, alive: true, ws: ws};
      connections[fromname] = connection;
    } else {
      if (data.msg && data.msg.includes(', ')) {
        let [video, toname] = data.msg.split(', ');
        if (connections[toname]) {
          await VL.likeVideo(video);
          const number = parseInt(await VL.getLikes(video));
          const message = { msg: `like ${video} ${number}`, name: fromname };
          connections[toname].ws.send(JSON.stringify(message));
        } else {
          console.log(`Connection with id ${toname} not found`);
        }
      } else {
        console.log(data);
      }
    }
  });

  // Remove the closed connection
  ws.on('close', () => {
    delete connections[connection.id];
  });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  Object.keys(connections).forEach((id) => {
    let c = connections[id];
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);