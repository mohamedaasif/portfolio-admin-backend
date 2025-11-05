const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const { hashPassword, verifyPassword } = require("../utils/hash");

const secretKey = process.env.SECRET_KEY;

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

async function signin(req, res) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "All fields are required" });
  try {
    const existingUser = await userService.findUserByEmail(email);
    if (!existingUser) return res.status(404).json({ error: "No user found" });
    const passwordCheck = await verifyPassword(password, existingUser.password);
    if (!passwordCheck)
      return res.status(404).json({ error: "Incorrect Password" });

    const responseData = {
      id: existingUser._id.toString(),
      name: existingUser.name,
      emailId: existingUser.email,
    };
    const token = await jwt.sign(responseData, secretKey, { expiresIn: "1h" });

    return res.status(200).json({
      message: "Signin successful",
      authToken: token,
    });
  } catch {
    console.error("Signin error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { signup, signin };
