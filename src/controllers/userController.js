const userService = require("../services/userService");

async function getUserDetails(req, res) {
  try {
    const { email } = req.params;

    if (!email) return res.status(400).json({ error: "Missing email field." });

    const result = await userService.findUserByEmail(email);
    const { name, email: emailId, isAdmin } = result;
    res
      .status(200)
      .json({ message: "Success", data: { name, emailId, isAdmin } });
  } catch (err) {
    console.log("Fetching user details failed: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUserDetails,
};
