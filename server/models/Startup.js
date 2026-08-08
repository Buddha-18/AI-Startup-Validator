const mongoose = require("mongoose");

const startupSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startupName: {
      type: String,
      required: true,
      trim: true,
    },

    idea: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    audience: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String,
      required: true,
      trim: true,
    },

    teamSize: {
      type: String,
      required: true,
      trim: true,
    },

    // =========================
    // STAGE 1
    // Executive Summary
    // =========================

    executiveSummary: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // =========================
    // STAGE 2
    // Market Analysis
    // =========================

    marketAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // =========================
    // Future Stages
    // =========================

    competitorAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    swotAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    revenueAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    overallScore: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    finalReport: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Startup", startupSchema);