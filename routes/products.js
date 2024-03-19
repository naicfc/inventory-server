const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    products: [
      { id: 1, name: "mango" },
      { id: 2, name: "banana" },
      { id: 3, name: "pear" },
      { id: 4, name: "apple" },
    ],
  });
});

router.get("/:id", (req, res) => {
  res.json({
    message: "Get single product",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "create a new product",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "delete a product",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    message: "update a product",
  });
});

module.exports = router;
