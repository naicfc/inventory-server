const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema(
  {
    productID: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
  },
  { timestamps: true }
);

const TransactionSchema = new Schema({
  transactionType: { type: String, required: true },
  transactionDate: { type: Date, default: Date.now },
  productDetails: [ProductDetailSchema],
  totalPrice: { type: Number, required: true },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
