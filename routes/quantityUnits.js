const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { addQuantity, getQuantityUnits } = require("../controllers/quantityUnitsController");

const router = express.Router();

router.get("/", getQuantityUnits);

router.get("/:id", (req, res) => {
  res.json({
    message: "Not Found",
  });
});

router.post("/", addQuantity);

router.delete("/:id", (req, res) => {
  res.json({
    message: "Not Found",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    message: "Not found",
  });
});

module.exports = router;
