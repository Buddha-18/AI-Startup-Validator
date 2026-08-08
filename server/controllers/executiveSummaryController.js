const {
  generateExecutiveSummary,
} = require("../services/executiveSummaryService");

const Startup = require("../models/Startup");

const generateExecutiveSummaryController = async (req, res) => {
  try {
    const {
      startupName,
      idea,
      industry,
      country,
      audience,
      budget,
      teamSize,
    } = req.body;

    // Validate required fields
    if (
      !startupName ||
      !idea ||
      !industry ||
      !country ||
      !audience ||
      !budget ||
      !teamSize
    ) {
      return res.status(400).json({
        success: false,
        message: "All startup fields are required",
      });
    }

    // Check authenticated user
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const startupData = {
      startupName,
      idea,
      industry,
      country,
      audience,
      budget,
      teamSize,
    };

    console.log("Generating Executive Summary...");

    // Generate AI analysis
    const executiveSummary =
      await generateExecutiveSummary(startupData);

    console.log(
      "Executive Summary generated successfully."
    );

    // Save startup + analysis to MongoDB
    const analysis = await Startup.create({
      user: req.user.id,

      startupName,
      idea,
      industry,
      country,
      audience,
      budget,
      teamSize,

      executiveSummary,
    });

    console.log("Analysis saved to MongoDB.");

    return res.status(201).json({
      success: true,
      message: "Executive summary generated successfully",
      data: analysis,
    });

  } catch (error) {
    console.error(
      "Executive Summary Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to generate executive summary",
      error: error.message,
    });
  }
};

module.exports = {
  generateExecutiveSummaryController,
};