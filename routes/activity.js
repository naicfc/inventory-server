const express = require("express");
const { logActivity, geActivities } = require("../controllers/activityController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//router.use(requireAuth);

// router.get("/", getCategories);

// router.get("/:id", getOneCategory);

router.post("/", logActivity);

router.get("/", geActivities);

module.exports = router;
