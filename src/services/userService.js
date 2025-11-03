const { getDB } = require("../config/db");

async function findUserByEmail(email) {
  const db = getDB();
  return await db.collection("users").findOne({ email });
}

async function createUser(user) {
  const db = getDB();
  return await db.collection("users").insertOne(user);
}

module.exports = { findUserByEmail, createUser };
