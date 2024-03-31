const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const DB = require('./database.js');
const app = express();

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
    res.cookie(authCookieName, user.token, { maxAge: 900000, httpOnly: true });
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
      res.cookie(authCookieName, user.token, { maxAge: 900000, httpOnly: true });
      res.send( user );
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//get_bool_LoggedIn
apiRouter.get('/auth/loggedIn', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.send(true);
    return;
  }
  res.send(false);
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
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
    res.json(user.email);
  } else {
    res.status(404).json(null);
  }
});


//getName
secureApiRouter.get('/profileName', async (req, res) => {
  const user = await DB.getUserByToken(req.cookies.token);
  if (user) {
    res.json(user.name);
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

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: false, //*****************************************change to true in production*****************************************************
    httpOnly: true,
    sameSite: 'none',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});