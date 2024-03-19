const express = require("express");

const router = express.Router();


router.get("/", (req, res) => {
  res.json({
    products: [
      { id: 1, name: "food" },
      { id: 2, name: "drinks" },
      { id: 3, name: "electronics" },
      { id: 4, name: "tools" },
    ],
  });
});

router.get("/:id", (req, res) => {
  res.json({
    message: "Get single category",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "create a new category",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "delete a category",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    message: "update a category",
  });
});


module.exports = router;
