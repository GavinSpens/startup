const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// // GetScores
// apiRouter.get('/scores', (_req, res) => {
//   res.send(scores);
// });

// // SubmitScore
// apiRouter.post('/score', (req, res) => {
//   scores = updateScores(req.body, scores);
//   res.send(scores);
// });

//getEmail
apiRouter.get('/email', (_req, res) => {
  //modify this to get the email from the database
  res.send(email);
});

// GetProfileDescription
apiRouter.get('/profile', (_req, res) => {
  res.send(profile);
});

// UpdateProfileDescription
apiRouter.post('/profile', (req, res) => {
  profile = updateProfile(req.body);
  res.send(profile);
});

// ProfilePic is going to be randomized, with a reroll option

// GetProfilePic
apiRouter.get('/profilePic', (_req, res) => {
  res.send(profilePic);
});

// UpdateProfilePic
apiRouter.post('/profilePic', (req, res) => {
  profilePic = updateProfilePic(req.body);
  res.send(profilePic);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});