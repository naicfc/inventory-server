const Transaction = require("../models/transaction");
const mongoose = require("mongoose");
const Product = require("../models/product");
const { logActivity } = require("../controllers/activityController");

const createTransaction = async (req, res, next) => {
  try {
    const { products, subTotal, discount, VAT, userID, total } = req.body;

    const transaction = new Transaction({
      transactionType: "sale",
      productDetails: products,
      totalPrice: total,
      paymentMethod: req.body.paymentMethod,
      subTotal,
      discount,
      VAT,
      status: "completed",
      user: userID,
    });

    await updateProductQuantities(products);

    const savedTransaction = await transaction.save();

    await logActivity(userID, "Sale", `User processed a transaction of GHC ${total}.`);

    res.status(200).json({
      success: true,
      message: "Transaction completed successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductQuantities = async (productDetails) => {
  for (const productDetail of productDetails) {
    const { productId, batchNumber, quantity, type } = productDetail;

    const product = await Product.findById(productId);

    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    const batchIndex = product.batches.findIndex((batch) => batch.batchNumber === batchNumber);

    if (batchIndex === -1) {
      throw new Error(`Batch with number ${batchNumber} not found for product ${product.name}`);
    }

    if (type === "wholesale") {
      product.batches[batchIndex].quantity -= quantity * product.conversionRate;
    } else {
      product.batches[batchIndex].quantity -= quantity;
    }

    await product.save();
  }
};

const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({})
      .sort("-transactionDate")
      .populate("user", "fullname")
      .exec();

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = { createTransaction, getTransactions };
