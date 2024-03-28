const ProductQuantityUnit = require("../models/productQuantityUnit");
const mongoose = require("mongoose");

const addProductQuantityUnit = async (req, res, next) => {
  const { productID, quantityUnitID, conversionRateToBase } = req.body;

  try {
    if (!productID || !quantityUnitID || !conversionRateToBase) {
      throw Error("All fields must be present");
    }

    const exists = await ProductQuantityUnit.findOne({ productID });

    if (exists) {
      throw Error("Product Quantity unit already exists");
    }
    
    const unit = await ProductQuantityUnit.create({
      productID,
      quantityUnitID,
      conversionRateToBase,
    });

    res.status(201).json(unit);
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

const getProductQuantityUnits = async (req, res, next) => {
  try {
    const units = await ProductQuantityUnit.find({});

    res.status(200).json(units);
  } catch (error) {
    next(error);
  }
};

module.exports = { addProductQuantityUnit, getProductQuantityUnits };
