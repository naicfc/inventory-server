const Product = require("../models/product");
const mongoose = require("mongoose");

const addProduct = async (req, res, next) => {
  const { name, description, quantity, barcode, categoryID, unitPrices, defaultUnit } = req.body;

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
    });

    res.status(201).json(product);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .populate("categoryID", "name")
      .populate("defaultUnit", "name")
      .exec();

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
    const product = await Product.findById(id)
      .populate("categoryID", "name")
      .populate("defaultUnit", "name")
      .exec();

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
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Product does not exist" });
    }

    const product = await Product.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

    if (!product) {
      return res.status(404).json({ error: "Category does not exist" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = { addProduct, getProducts, getOneProduct, deleteProduct, updateProduct };
