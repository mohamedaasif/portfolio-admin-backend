const fs = require("fs/promises");
const path = require("path");

const deleteFile = async (filename) => {
  if (!filename) return;

  const filePath = path.join(__dirname, "../../", "uploads", filename);

  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") {
      console.log("File delete failed:", err);
    }
  }
};

module.exports = deleteFile;
