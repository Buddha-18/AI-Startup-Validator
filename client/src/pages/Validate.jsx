
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Validate.css";
import API from "../api/api";

import ValidatorForm from "../components/validator/ValidatorForm";
import ExecutiveSummary from "../components/validator/ExecutiveSummary";

const Validate = () => {
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.post(
        "/analysis/executive-summary",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(
          result.message || "Failed to generate analysis"
        );
      }

      console.log("Executive Summary:", result.data);

      setAnalysis(result.data);
    } catch (error) {
      console.error("Analysis Error:", error);
      

      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while analyzing your startup.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeAgain = () => {
    setAnalysis(null);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="validate-page">

      {/* Header */}
      <header className="validate-header">

        <div
          className="validate-logo"
          onClick={() => navigate("/")}
        >
          <span className="logo-icon">🚀</span>

          <div>
            <h2>AI Startup</h2>
            <span>Validator</span>
          </div>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </header>


      {/* Main */}
      <main className="validate-main">

        {!analysis && (
          <div className="validate-heading">

            <span className="heading-badge">
              ✨ AI-Powered Validation
            </span>

            <h1>
              Validate Your <span>Startup Idea</span>
            </h1>

            <p>
              Tell us about your startup and let AI analyze its
              potential, market demand, competition, scalability,
              and business opportunities.
            </p>

          </div>
        )}


        {/* Error */}
        {error && (
          <div className="analysis-error">

            <strong>
              Analysis Failed
            </strong>

            <p>
              {error}
            </p>

          </div>
        )}


        {/* Startup Form */}
        {!analysis && (
          <ValidatorForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}


        {/* Executive Summary */}
        {analysis && (
          <ExecutiveSummary
            analysis={analysis}
            onAnalyzeAgain={handleAnalyzeAgain}
          />
        )}

      </main>

    </div>
  );
};

export default Validate;
