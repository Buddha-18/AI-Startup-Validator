const express = require("express");
const router = express.Router();

const Startup = require("../models/Startup");
const authMiddleware = require("../middleware/authMiddleware");

// GET user's latest startup
router.get("/my-startup", authMiddleware, async (req, res) => {
  try {
    const startup = await Startup.findOne({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "No startup found",
      });
    }

    res.status(200).json({
      success: true,
      startup,
    });
  } catch (error) {
    console.error("Dashboard startup error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch startup",
    });
  }
});

module.exports = router;