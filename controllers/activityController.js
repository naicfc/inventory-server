const Activity = require("../models/activity");

const logActivity = async (user, action, details) => {
  try {
    const activity = new Activity({
      user: user,
      action: action,
      details: details,
    });
    await activity.save();
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

const geActivities = async (req, res, next) => {
  try {
    const activities = await Activity.find({}).populate("user", "fullname").exec();

    if (!activities) {
      throw new Error("Activities not found");
    }

    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
};

module.exports = { logActivity, geActivities };
