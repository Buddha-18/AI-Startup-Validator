
import React from "react";

const ExecutiveSummary = ({
  analysis,
  onAnalyzeAgain,
}) => {
  const summary = analysis.executiveSummary;

  return (
    <section className="analysis-result">

      {/* ================= RESULT HEADER ================= */}

      <div className="result-header">

        <div>

          <span className="result-badge">
            ✨ AI Analysis Complete
          </span>

          <h1>
            {analysis.startupName}
          </h1>

          <p>
            Executive Summary
          </p>

        </div>


        <div className="confidence-box">

          <span>
            AI Confidence
          </span>

          <strong>
            {summary.confidence}%
          </strong>

        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="result-card">

        <h2>
          {summary.title}
        </h2>

        <p>
          {summary.summary}
        </p>

      </div>


      {/* ================= PROBLEM + SOLUTION ================= */}

      <div className="result-grid">

        <div className="result-card">

          <h3>
            🎯 Problem
          </h3>

          <p>
            {summary.problem}
          </p>

        </div>


        <div className="result-card">

          <h3>
            💡 Solution
          </h3>

          <p>
            {summary.solution}
          </p>

        </div>

      </div>


      {/* ================= MARKET + BUSINESS MODEL ================= */}

      <div className="result-grid">

        <div className="result-card">

          <h3>
            🌍 Target Market
          </h3>

          <p>
            {summary.targetMarket}
          </p>

        </div>


        <div className="result-card">

          <h3>
            💰 Business Model
          </h3>

          <p>
            {summary.businessModel}
          </p>

        </div>

      </div>


      {/* ================= STRENGTHS + CHALLENGES ================= */}

      <div className="result-grid">

        <div className="result-card">

          <h3>
            💪 Key Strengths
          </h3>

          <ul>
            {summary.keyStrengths.map(
              (strength, index) => (
                <li key={index}>
                  {strength}
                </li>
              )
            )}
          </ul>

        </div>


        <div className="result-card">

          <h3>
            ⚠️ Key Challenges
          </h3>

          <ul>
            {summary.keyChallenges.map(
              (challenge, index) => (
                <li key={index}>
                  {challenge}
                </li>
              )
            )}
          </ul>

        </div>

      </div>


      {/* ================= RECOMMENDATION ================= */}

      <div className="result-card recommendation-card">

        <h3>
          🚀 AI Recommendation
        </h3>

        <p>
          {summary.recommendation}
        </p>

      </div>


      {/* ================= ACTION ================= */}

      <div className="result-actions">

        <button
          className="validate-btn"
          onClick={onAnalyzeAgain}
        >
          Analyze Another Startup →
        </button>

      </div>

    </section>
  );
};

export default ExecutiveSummary;

