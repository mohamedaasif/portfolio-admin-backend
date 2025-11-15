const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectByID,
  updateProject,
  removeProject,
} = require("../controllers/projectController");
const auth = require("../middleware/auth");

router.post("/create", auth, createProject);
router.get("/get", auth, getAllProjects);
router.get("/get/:postId", auth, getProjectByID);
router.put("/update", auth, updateProject);
router.delete("/delete/:postId", auth, removeProject);

module.exports = router;
