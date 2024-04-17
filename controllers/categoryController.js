const Category = require("../models/category");
const mongoose = require("mongoose");

const addCategory = async (req, res, next) => {
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      throw Error("All fields must be present");
    }

    const exists = await Category.findOne({ name });

    if (exists) {
      throw Error("Category already exists");
    }

    const category = await Category.create({ name, description });

    res.status(200).json(category);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getOneCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Category does not exist" });
  }

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category does not exist" });
    }
    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Category does not exist" });
  }

  try {
    const category = await Category.findOneAndDelete({ _id: id });

    if (!category) {
      return res.status(404).json({ error: "Category does not exist" });
    }

    res.status(200).json({ category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Category does not exist" });
    }

    const category = await Category.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

    if (!category) {
      return res.status(404).json({ error: "Category does not exist" });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = { addCategory, getCategories, getOneCategory, deleteCategory, updateCategory };
