const Product = require("../models/product");
const mongoose = require("mongoose");
const { logActivity } = require("../controllers/activityController");

const addProduct = async (req, res, next) => {
  const {
    name,
    description,
    quantity,
    barcode,
    categoryID,
    unitPrices,
    defaultUnit,
    wholesaleUnit,
    conversionRate,
    discountPercentage,
    batches,
  } = req.body;

  try {
    if (!name || !description) {
      throw Error("All fields must be present");
    }

    const exists = await Product.findOne({ name });

    if (exists) {
      throw Error("Product already exists");
    }

    const product = await Product.create({
      name,
      description,
      quantity,
      barcode,
      categoryID,
      unitPrices,
      defaultUnit,
      wholesaleUnit,
      conversionRate,
      discountPercentage,
      batches,
    });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("categoryID", "name").exec();

    if (!products) {
      throw new Error("Products not found");
    }

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getOneProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Product does not exist" });
  }

  try {
    const product = await Product.findById(id).populate("categoryID", "name").exec();

    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Product does not exist" });
  }

  try {
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
      return res.status(404).json({ error: "Product does not exist" });
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  console.log(data);
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid product ID" });
    }

    const product = await Product.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

const addBatchToProduct = async (req, res, next) => {
  const { id } = req.params;
  const { batchNumber, quantity, expiryDate } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.batches.filter((element) => {
      if (element.batchNumber == batchNumber) {
        return res.status(404).json({ error: "Batch name already exists" });
      }
    });

    const newBatch = {
      batchNumber,
      quantity,
      expiryDate,
    };

    product.batches.push(newBatch);

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  addBatchToProduct,
};
