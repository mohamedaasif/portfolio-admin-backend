const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function postProject(data) {
  const db = getDB();
  return await db.collection("projects").insertOne(data);
}

async function putProject(postId, data) {
  const db = getDB();
  return await db
    .collection("projects")
    .findOneAndUpdate(
      { _id: new ObjectId(String(postId)) },
      { $set: data },
      { returnDocument: "after" }
    );
}

async function findAllProjects() {
  const db = getDB();
  return await db.collection("projects").find().toArray();
}

async function deleteProject(postId) {
  const db = getDB();
  return await db
    .collection("projects")
    .deleteOne({ _id: new ObjectId(String(postId)) });
}

module.exports = { postProject, findAllProjects, putProject, deleteProject };
