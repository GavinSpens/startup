const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db(); // ********************* Need to change the database name or this line *****************************************
const userCollection = db.collection('user');
// const scoreCollection = db.collection('score');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    pfpLink: ""
  };
  await userCollection.insertOne(user);

  return user;
}

// async function getUserInfo(email) {
//   const user = await getUser(email);
//   if (user) {
//     return user;
//   } else {
//     return null;
//   }
// }

async function updatePfp(token, pfpLink) {
  const filter = { token: token };
  const update = { $set: { pfpLink: pfpLink } };

  const result = await userCollection.updateOne(filter, update);

  if (result.matchedCount > 0) {
      console.log(`Successfully updated the pfp link: ${pfpLink}`);
      return true;
  } else {
      console.log(`No user found with the token: ${token}`);
      return false;
  }
}

// async function getPfp(token) {
//   const user = await userCollection.findOne({ token: token });
//   return user;
// }

// function addScore(score) {
//   scoreCollection.insertOne(score);
// }

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updatePfp,
  // getPfp,
//   addScore,
//   getHighScores,
};