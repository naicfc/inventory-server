const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  addProductQuantityUnit,
  getProductQuantityUnits,
} = require("../controllers/productQuantityUnit");

const router = express.Router();

router.get("/", getProductQuantityUnits);

router.get("/:id", (req, res) => {
  res.json({
    message: "Not Found",
  });
});

router.post("/", addProductQuantityUnit);

router.delete("/:id", (req, res) => {
  res.json({
    message: "Not Found",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    message: "Not Found",
  });
});

module.exports = router;
