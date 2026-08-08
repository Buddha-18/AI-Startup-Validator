const express = require("express");

const {
  generateExecutiveSummaryController,
} = require("../controllers/executiveSummaryController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/executive-summary",
  authMiddleware,
  generateExecutiveSummaryController
);

module.exports = router;