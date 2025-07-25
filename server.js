const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const port = process.env.PORT;

mongoose
  .connect(process.env.DB_CONNECTION_URI)
  .then(() => {
    console.log("DB Connected!");
    app.listen(port, () => {
      console.log("Server running on port " + port);
    });
  })
  .catch((err) => console.error("Connection Failed:", err.message));
