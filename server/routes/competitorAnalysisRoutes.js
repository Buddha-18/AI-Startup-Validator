const express = require("express");

const {
  generateCompetitorAnalysisController,
} = require("../controllers/competitorAnalysisController");

const router = express.Router();

router.post(
  "/competitor",
  generateCompetitorAnalysisController
);

module.exports = router;