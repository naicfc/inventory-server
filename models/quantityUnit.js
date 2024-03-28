const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuantityUnitSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    baseUnit: { type: Boolean, default: false },
  }
);

const QuantityUnit = mongoose.model("QuantityUnit", QuantityUnitSchema);
module.exports = QuantityUnit;
