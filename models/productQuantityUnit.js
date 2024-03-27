const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductQuantityUnitSchema = new Schema({
  productID: { type: Schema.Types.ObjectId, ref: "Product" },
  quantityUnitID: { type: Schema.Types.ObjectId, ref: "QuantityUnit" },
  conversionRateToBase: Number,
});

const ProductQuantityUnit = mongoose.model("ProductQuantityUnit", ProductQuantityUnitSchema);
module.exports = ProductQuantityUnit;