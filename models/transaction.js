const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDetailSchema = new Schema({
  productID: { type: Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const TransactionSchema = new Schema(
  {
    transactionType: { type: String, required: true },
    transactionDate: { type: Date, default: Date.now },
    productDetails: [ProductDetailSchema],
    totalPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
