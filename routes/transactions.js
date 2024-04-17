const express = require("express");
const { createTransaction, getTransactions } = require("../controllers/transactionController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//router.use(requireAuth);

router.get("/", getTransactions);

router.get("/:id", (req, res) => {
  res.json({
    message: "Get single transactions",
  });
});

router.post("/", createTransaction);

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
