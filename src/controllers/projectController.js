const projectService = require("../services/projectService");
const deleteFile = require("../utils/deleteFile");

async function createProject(req, res) {
  const { title, description, technology, webLink, ghLink, workedAt, year } =
    req.body;
  try {
    const data = {
      title,
      description,
      technology: JSON.parse(technology),
      webLink,
      ghLink,
      thumbnail: req.file ? req.file.filename : null,
      workedAt,
      year,
    };
    const result = await projectService.postProject(data);
    res.status(200).json({ message: "Success", projectId: result.insertedId });
  } catch (err) {
    console.log("Creating Project Failed: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllProjects(req, res) {
  try {
    const result = await projectService.findAllProjects();
    res.status(200).json({ message: "Success", data: result });
  } catch (err) {
    console.log("Getting project failed: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProjectByID(req, res) {
  try {
    const { projectId } = req.params;
    if (!projectId)
      return res.status(400).json({ error: "Missing projectId field." });

    const result = await projectService.findProject(projectId);
    if (!result) res.status(404).json({ message: "No Data found" });
    res.status(200).json({ message: "Success", data: result });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProject(req, res) {
  try {
    const {
      projectId,
      title,
      description,
      technology,
      webLink,
      ghLink,
      workedAt,
      year,
    } = req.body;

    const data = {
      title,
      description,
      technology: JSON.parse(technology),
      webLink,
      ghLink,
      workedAt,
      year,
    };
    if (req?.file?.filename) {
      data.thumbnail = req.file.filename;
    }

    if (!projectId)
      return res.status(400).json({ error: "Missing projectId field." });

    const projectDetails = await projectService.findProject(projectId);

    if (projectDetails?.thumbnail) {
      deleteFile(projectDetails.thumbnail);
    }

    const result = await projectService.putProject(projectId, data);
    res.status(200).json({ message: "Success", data: result });
  } catch (err) {
    console.log("Updating project failed: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function removeProject(req, res) {
  try {
    const { projectId } = req.params;

    if (!projectId)
      return res.status(400).json({ error: "Missing projectId field." });

    const projectDetails = await projectService.findProject(projectId);

    if (projectDetails?.thumbnail) {
      deleteFile(projectDetails.thumbnail);
    }

    const result = await projectService.deleteProject(projectId);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log("Deleting project failed: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectByID,
  updateProject,
  removeProject,
};
