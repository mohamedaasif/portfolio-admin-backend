const express = require("express");
const path = require("path");
require("dotenv").config();

const auth = require("./src/middleware/auth");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// middleware
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", auth, projectRoutes);
app.use("/api/userDetails", auth, userRoutes);

const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
