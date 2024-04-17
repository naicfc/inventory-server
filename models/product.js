const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductBatchSchema = new Schema({
  batchNumber: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  expiryDate: { type: Date, required: true },
});

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    barcode: String,
    categoryID: { type: Schema.Types.ObjectId, ref: "Category" },
    unitPrices: {
      wholesalePrice: { type: Number, required: true },
      retailPrice: { type: Number, required: true },
    },
    defaultUnit: String,
    wholesaleUnit: String,
    conversionRate: { type: Number, default: 1 },
    discountPercentage: { type: Number, default: 0 },
    batches: [ProductBatchSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
