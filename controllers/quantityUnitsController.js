const QuantityUnit = require("../models/quantityUnit");
const mongoose = require("mongoose");

const addQuantity = async (req, res, next) => {
  const { name, description, baseUnit } = req.body;

  try {
    if (!name || !description) {
      throw Error("All fields must be present");
    }

    const exists = await QuantityUnit.findOne({ name });

    if (exists) {
      throw Error("Unit already exists");
    }

    const quantityUnit = await QuantityUnit.create({ name, description, baseUnit });

    res.status(201).json(quantityUnit);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

const getQuantityUnits = async (req, res, next) => {
  try {
    const units = await QuantityUnit.find({});

    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
};

module.exports = { addQuantity, getQuantityUnits };
