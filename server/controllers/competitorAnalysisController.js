const Startup = require("../models/Startup");

const {
  generateCompetitorAnalysis,
} = require("../services/competitorAnalysisService");

const generateCompetitorAnalysisController = async (req, res) => {
  try {
    const { startupId } = req.body;

    if (!startupId) {
      return res.status(400).json({
        success: false,
        message: "startupId is required",
      });
    }

    // Find startup in MongoDB
    const startup = await Startup.findById(startupId);

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    // Use existing startup data from MongoDB
    const startupData = {
      startupName: startup.startupName,
      idea: startup.idea,
      industry: startup.industry,
      country: startup.country,
      audience: startup.audience,
      budget: startup.budget,
      teamSize: startup.teamSize,
    };

    console.log(
      "Generating Competitor Analysis for:",
      startup.startupName
    );

    // Generate AI analysis
    const competitorAnalysis =
      await generateCompetitorAnalysis(startupData);

    // Save analysis
    startup.competitorAnalysis =
      competitorAnalysis;

    await startup.save();

    return res.status(200).json({
      success: true,
      message:
        "Competitor analysis generated successfully",
      data: competitorAnalysis,
    });

  } catch (error) {
    console.error(
      "Competitor Analysis Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate competitor analysis",
    });
  }
};

module.exports = {
  generateCompetitorAnalysisController,
};