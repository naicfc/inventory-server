const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
  quantity: Number,
  name: String,
  discount: Number,
  price: Number,
  total: Number,
  type: String,
});

const TransactionSchema = new Schema(
  {
    transactionType: { type: String, required: true },
    transactionDate: { type: Date, default: Date.now },
    productDetails: [ProductDetailSchema],
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    subTotal: { type: Number, required: true },
    discount: { type: Number, required: true },
    VAT: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
