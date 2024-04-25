const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (username, password, role, fullname) {
  if (!username || !password || !role || !fullname) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("username already in use");
  }

  const salt = await bcrypt.genSalt(13);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash, role, fullname });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("username is incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password is incorrect");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
