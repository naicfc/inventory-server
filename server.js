require("dotenv").config();
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const transactionRoutes = require("./routes/transactions");
const categoryRoutes = require("./routes/categories");

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method.red);
  next();
});

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`MongoDB Connected`.cyan.underline.bold);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`.blue);
    });
  })
  .catch((error) => {
    console.log(error);
  });
