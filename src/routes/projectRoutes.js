const express = require("express");
const router = express.Router();

const {
  createProject,
  getAllProjects,
  getProjectByID,
  updateProject,
  removeProject,
} = require("../controllers/projectController");
const upload = require("../middleware/multer");

router.post("/create", upload.single("thumbnail"), createProject);
router.get("/get", getAllProjects);
router.get("/get/:postId", getProjectByID);
router.put("/update", upload.single("thumbnail"), updateProject);
router.delete("/delete/:postId", removeProject);

module.exports = router;
