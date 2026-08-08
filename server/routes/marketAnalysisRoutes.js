const express = require("express");

const {
  generateMarketAnalysisController,
} = require("../controllers/marketAnalysisController");

const router = express.Router();

router.post(
  "/market",
  generateMarketAnalysisController
);

module.exports = router;