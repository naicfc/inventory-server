const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
});

CategorySchema.statics.add = async function (name, description) {
  if (!name || !description) {
    throw Error("All fields must be present");
  }

  const exists = await this.findOne({ name });

  if (exists) {
    throw Error("Category already exists");
  }

  const category = this.create({ name, description });

  return category;
};

CategorySchema.statics.getAll = async function () {
  const categories = await this.find({});

  return categories;
};

CategorySchema.statics.getOne = async function (id) {
  const category = await this.findById(id);

  return category;
};

CategorySchema.statics.delete = async function (id) {
  const category = await this.findOneAndDelete({ _id: id });

  return category;
};

CategorySchema.statics.update = async function (id, data) {
  const category = await this.findOneAndUpdate({ _id: id }, { ...data }, { new: true });

  return category;
};

module.exports = mongoose.model("Category", CategorySchema);
