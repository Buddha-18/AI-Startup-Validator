const express = require("express");

const {
  createSWOTAnalysis,
  getSWOTAnalysis,
} = require("../controllers/swotAnalysisController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Generate SWOT Analysis
router.post(
  "/:startupId",
  authMiddleware,
  createSWOTAnalysis
);

// Get existing SWOT Analysis
router.get(
  "/:startupId",
  authMiddleware,
  getSWOTAnalysis
);

module.exports = router;