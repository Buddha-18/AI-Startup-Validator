const Startup = require("../models/Startup");
const { generateSWOTAnalysis } = require("../services/swotAnalysisService");

// ==========================================
// Generate SWOT Analysis
// ==========================================
const createSWOTAnalysis = async (req, res) => {
  try {
    const { startupId } = req.params;

    // Find startup belonging to logged-in user
    const startup = await Startup.findOne({
      _id: startupId,
      user: req.user.id,
    });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    // Generate SWOT using AI
    const swotAnalysis = await generateSWOTAnalysis(startup);

    // Save SWOT result in MongoDB
    startup.swotAnalysis = swotAnalysis;

    await startup.save();

    return res.status(200).json({
      success: true,
      message: "SWOT analysis generated successfully",
      data: swotAnalysis,
    });
  } catch (error) {
    console.error("SWOT Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate SWOT analysis",
      error: error.message,
    });
  }
};

// ==========================================
// Get Existing SWOT Analysis
// ==========================================
const getSWOTAnalysis = async (req, res) => {
  try {
    const { startupId } = req.params;

    const startup = await Startup.findOne({
      _id: startupId,
      user: req.user.id,
    });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: "Startup not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: startup.swotAnalysis,
    });
  } catch (error) {
    console.error("Get SWOT Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch SWOT analysis",
      error: error.message,
    });
  }
};

module.exports = {
  createSWOTAnalysis,
  getSWOTAnalysis,
};