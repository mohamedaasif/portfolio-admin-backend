const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/authController");

router.post("/signup", signup);
router.get("/login", signin);

module.exports = router;
