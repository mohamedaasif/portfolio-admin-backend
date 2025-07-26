const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.DB_CONNECTION_URI);

let db;
async function connectDB() {
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}

module.exports = connectDB;
module.exports.getDB = getDB;
