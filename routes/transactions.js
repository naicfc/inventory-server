const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "get all transactions",
  });
});

router.get("/:id", (req, res) => {
  res.json({
    message: "Get single transactions",
  });
});

router.post("/", (req, res) => {
  res.json({
    message: "create a new transactions",
  });
});

router.delete("/:id", (req, res) => {
  res.json({
    message: "delete a transactions",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    message: "update a transactions",
  });
});

module.exports = router;
