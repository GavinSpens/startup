const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json').mongodb;

const url = `mongodb+srv://${config.username}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db();
const userCollection = db.collection('user');


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
    pfpLink: "",
    name: email,
    description: "No profile description added",
    verified: false,
  };
  await userCollection.insertOne(user);

  return user;
}

async function verify(token, y_n) {
  const filter = { token: token };
  const update = { $set: { verified: y_n } };

  const result = await userCollection.updateOne(filter, update);

  if (result.matchedCount > 0) {
      const un = y_n ? "" : "un";
      console.log(`Successfully ${un}verified user with token: ${token}`);
      return true;
  } else {
      console.log(`No user found with the token: ${token}`);
      return false;
  }
}

async function updateName(token, name) {
  const filter = { token: token };
  const update = { $set: { name: name } };

  const result = await userCollection.updateOne(filter, update);

  if (result.matchedCount > 0) {
      console.log(`Successfully updated name: ${name}`);
      return true;
  } else {
      console.log(`No user found with the token: ${token}`);
      return false;
  }
}

async function updateDescription(token, description) {
  const filter = { token: token };
  const update = { $set: { description: description } };

  const result = await userCollection.updateOne(filter, update);

  if (result.matchedCount > 0) {
      console.log(`Successfully updated description: ${description}`);
      return true;
  } else {
      console.log(`No user found with the token: ${token}`);
      return false;
  }
}

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

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  updatePfp,
  updateName,
  updateDescription,
  verify,
};