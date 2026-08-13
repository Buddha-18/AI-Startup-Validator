const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const analysisRoutes = require("./routes/executiveSummaryRoutes");
const marketAnalysisRoutes = require("./routes/marketAnalysisRoutes");
const startupRoutes = require("./routes/startupRoutes");
const competitorAnalysisRoutes = require("./routes/competitorAnalysisRoutes");
const swotAnalysisRoutes = require("./routes/swotAnalysisRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/analysis",marketAnalysisRoutes);
app.use("/api/startups", startupRoutes);
app.use("/api/analysis",competitorAnalysisRoutes);
app.use("/api/swot", swotAnalysisRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "AI Startup Validator Backend Running",
  });
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});