const express = require("express");
const {
  addCategory,
  getCategories,
  getOneCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//router.use(requireAuth);

router.get("/", getCategories);

router.get("/:id", getOneCategory);

router.post("/", addCategory);

router.delete("/:id", deleteCategory);

router.patch("/:id", updateCategory);

module.exports = router;
