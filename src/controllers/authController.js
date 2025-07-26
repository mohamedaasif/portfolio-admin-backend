const userService = require("../services/userService");
const { hashPassword } = require("../utils/hash");

async function signup(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser)
      return res.status(409).json({ error: "Email already registered" });

    const hashedPassword = await hashPassword(password);
    const user = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await userService.createUser(user);
    res
      .status(201)
      .json({ message: "Signup successful", userId: result.insertedId });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { signup };
