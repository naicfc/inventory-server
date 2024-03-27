const Category = require("../models/category");
const mongoose = require("mongoose");

const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await Category.add(name, description);

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();

    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneCategory = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Category does not exist" });
    }

    const category = await Category.getOne(id);

    if (!category) {
      return res.status(404).json({ error: "Category does not exist" });
    }
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Category does not exist" });
    }

    const category = await Category.delete(id);

    if (!category) {
      return res.status(404).json({ error: "Category does not exist" });
    }

    res.status(200).json({ category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Category does not exist" });
    }

    const category = await Category.update(id, req.body);

    if (!category) {
      return res.status(404).json({ error: "Category does not exist" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addCategory, getCategories, getOneCategory, deleteCategory, updateCategory };
