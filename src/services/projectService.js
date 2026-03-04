const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function postProject(data) {
  const db = getDB();
  return await db.collection("projects").insertOne(data);
}

async function putProject(projectId, data) {
  const db = getDB();
  return await db
    .collection("projects")
    .findOneAndUpdate(
      { _id: new ObjectId(String(projectId)) },
      { $set: data },
      { returnDocument: "after" },
    );
}

async function findAllProjects() {
  const db = getDB();
  return await db.collection("projects").find().toArray();
}

async function findProject(projectId) {
  const db = getDB();
  return await db
    .collection("projects")
    .findOne({ _id: new ObjectId(String(projectId)) });
}

async function deleteProject(projectId) {
  const db = getDB();
  return await db
    .collection("projects")
    .deleteOne({ _id: new ObjectId(String(projectId)) });
}

module.exports = {
  postProject,
  findAllProjects,
  findProject,
  putProject,
  deleteProject,
};
