const express = require("express");
require("dotenv").config();

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/api/auth", authRoutes);

const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server running on port " + port);
  });
});
