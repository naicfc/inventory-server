const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { logActivity } = require("../controllers/activityController");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    const token = createToken(user._id);

    const fullname = user?.fullname;

    const role = user?.role;

    const id = user?._id;

    await logActivity(user._id, "User Login", `User ${user.fullname} logged in.`);

    res.status(200).json({ id, username, token, fullname, role });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

const signupUser = async (req, res, next) => {
  const { username, password, role, fullname } = req.body;

  try {
    const user = await User.signup(username, password, role, fullname);

    const token = createToken(user._id);

    await logActivity(user._id, "User Registration", `${user.fullname} was registered.`);

    res.status(200).json({ username, token, role, fullname });
  } catch (error) {
    error.statusCode = 400;
    next(error);
  }
};

module.exports = { signupUser, loginUser };
