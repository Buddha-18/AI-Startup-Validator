const Startup = require("../models/Startup");

const {
  generateMarketAnalysis,
} = require("../services/marketAnalysisService");

const generateMarketAnalysisController = async (req, res) => {
  try {
    const startupData = req.body;

    // Generate Market Analysis using AI
    const marketAnalysis =
      await generateMarketAnalysis(startupData);

    // If startup ID is provided, save the analysis
    if (startupData.startupId) {
      const startup = await Startup.findById(
        startupData.startupId
      );

      if (!startup) {
        return res.status(404).json({
          success: false,
          message: "Startup not found",
        });
      }

      startup.marketAnalysis = marketAnalysis;

      await startup.save();
    }

    res.status(200).json({
      success: true,
      message: "Market analysis generated successfully",
      data: marketAnalysis,
    });

  } catch (error) {
    console.error(
      "Market Analysis Controller Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate market analysis",
    });
  }
};

module.exports = {
  generateMarketAnalysisController,
};