const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    quantity: { type: Number, default: 0 },
    barcode: String,
    categoryID: { type: Schema.Types.ObjectId, ref: "Category" },
    unitPrices: {
      wholesalePrice: { type: Number, required: true },
      retailPrice: { type: Number, required: true },
    },
    defaultUnit: { type: Schema.Types.ObjectId, ref: "QuantityUnit" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
