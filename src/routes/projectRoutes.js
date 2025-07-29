const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  updateProject,
  removeProject,
} = require("../controllers/projectController");

router.post("/create", createProject);
router.get("/get", getAllProjects);
router.put("/update", updateProject);
router.delete("/delete/:postId", removeProject);

module.exports = router;
