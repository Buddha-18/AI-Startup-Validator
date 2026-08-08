import React from "react";

const MarketAnalysis = ({
  analysis,
  onBack,
}) => {
  if (!analysis) return null;

  return (
    <div className="market-analysis">

      <div className="analysis-header">
        <span className="analysis-badge">
          📊 Stage 2
        </span>

        <h1>Market Analysis</h1>

        <p>
          AI-powered analysis of your startup's target
          market, customer demand, trends, opportunities,
          and market risks.
        </p>
      </div>

      {/* Market Overview */}
      <section className="analysis-section">
        <h2>Market Overview</h2>
        <p>{analysis.marketOverview}</p>
      </section>

      {/* Target Market */}
      <section className="analysis-section">
        <h2>Target Market</h2>
        <p>{analysis.targetMarket}</p>
      </section>

      {/* Customer Needs */}
      <section className="analysis-section">
        <h2>Customer Needs</h2>

        <ul>
          {analysis.customerNeeds?.map(
            (need, index) => (
              <li key={index}>{need}</li>
            )
          )}
        </ul>
      </section>

      {/* Market Trends */}
      <section className="analysis-section">
        <h2>Market Trends</h2>

        <ul>
          {analysis.marketTrends?.map(
            (trend, index) => (
              <li key={index}>{trend}</li>
            )
          )}
        </ul>
      </section>

      {/* Opportunities */}
      <section className="analysis-section">
        <h2>Market Opportunities</h2>

        <ul>
          {analysis.marketOpportunities?.map(
            (opportunity, index) => (
              <li key={index}>{opportunity}</li>
            )
          )}
        </ul>
      </section>

      {/* Risks */}
      <section className="analysis-section">
        <h2>Market Risks</h2>

        <ul>
          {analysis.marketRisks?.map(
            (risk, index) => (
              <li key={index}>{risk}</li>
            )
          )}
        </ul>
      </section>

      {/* Growth & Demand */}
      <div className="analysis-grid">

        <section className="analysis-card">
          <h3>Market Growth</h3>
          <p>{analysis.marketGrowth}</p>
        </section>

        <section className="analysis-card">
          <h3>Customer Demand</h3>
          <p>{analysis.customerDemand}</p>
        </section>

      </div>

      {/* Score */}
      <section className="market-score-card">

        <div>
          <span>Market Attractiveness</span>

          <h2>
            {analysis.marketAttractiveness}/100
          </h2>
        </div>

        <div>
          <span>AI Confidence</span>

          <h2>
            {analysis.confidence}/100
          </h2>
        </div>

      </section>

      {/* Recommendation */}
      <section className="analysis-section recommendation">

        <h2>Recommendation</h2>

        <p>{analysis.recommendation}</p>

      </section>

      {onBack && (
        <button
          className="back-analysis-btn"
          onClick={onBack}
        >
          ← Back to Executive Summary
        </button>
      )}

    </div>
  );
};

export default MarketAnalysis;