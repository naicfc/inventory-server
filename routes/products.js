const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  addProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

const router = express.Router();

//router.use(requireAuth);

router.get("/", getProducts);

router.get("/:id", getOneProduct);

router.post("/", addProduct);

router.delete("/:id", deleteProduct);

router.patch("/:id", updateProduct);

module.exports = router;
