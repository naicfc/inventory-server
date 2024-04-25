const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    try {
      throw new Error("Authorization token required. Login to access resource");
    } catch (error) {
      error.statusCode = 401;
      next(error);
    }
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = requireAuth;
