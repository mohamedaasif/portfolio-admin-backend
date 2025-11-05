const express = require("express");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const userRoutes = require("./src/routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/userDetails", userRoutes);

const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
