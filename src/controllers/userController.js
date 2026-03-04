const userService = require("../services/userService");

async function getUserDetails(req, res) {
  try {
    const { email } = req.params;
    const loggedInUser = req.user;

    if (!email) return res.status(400).json({ error: "Missing email field." });
    if (email !== loggedInUser.emailId)
      return res.status(400).json({ error: "Invalid email field." });

    const result = await userService.findUserByEmail(email);
    if (!result) return res.status(400).json({ error: "Invalid email field." });

    const { firstName, lastName, email: emailId, role, dob, gender } = result;

    res.status(200).json({
      message: "Success",
      data: { firstName, lastName, emailId, role, dob, gender },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUserDetails,
};
