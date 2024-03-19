require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", (req, res) => {
  res.send("Welcome to inventory");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`MongoDB Connected`.cyan.underline.bold);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`.yellow);
    });
  })
  .catch((error) => {
    console.log(error);
  });
