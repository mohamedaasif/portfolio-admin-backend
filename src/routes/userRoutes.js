const express = require("express");
const router = express.Router();

const { getUserDetails } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/:email", auth, getUserDetails);

module.exports = router;
