import React from "react";

import ExecutiveSummary from "../validator/ExecutiveSummary";
import SWOTAnalysis from "../validator/SWOTAnalysis";

const AnalysisRenderer = ({
  startup,
  activeStage,
  hasAnalysis,
  marketLoading,
  marketError,
  onMarketAnalysis,

  competitorLoading,
  competitorError,
  onCompetitorAnalysis,

  onNewAnalysis,
  stages,
}) => {
  // ==========================================
  // NO STARTUP
  // ==========================================

  if (!startup) {
    return (
      <div className="empty-analysis">
        <div className="empty-analysis-icon">
          ✦
        </div>

        <h3>Your analysis will appear here</h3>

        <p>
          Submit your startup idea above
          to begin the validation process.
        </p>
      </div>
    );
  }

  // ==========================================
  // EXECUTIVE SUMMARY
  // ==========================================

  if (activeStage === "executiveSummary") {
    if (!hasAnalysis("executiveSummary")) {
      return (
        <div className="empty-analysis">
          <div className="empty-analysis-icon">
            01
          </div>

          <h3>Executive Summary</h3>

          <p>
            Submit the validator form to
            generate your executive summary.
          </p>
        </div>
      );
    }

    return (
      <div className="summary-wrapper">
        <ExecutiveSummary
          analysis={startup}
          onAnalyzeAgain={onNewAnalysis}
        />

        <div className="next-stage-box">
          <div>
            <span>STAGE 02</span>

            <h3>
              Continue with Market Analysis
            </h3>

            <p>
              Understand your target market,
              demand, trends, and growth
              opportunity.
            </p>
          </div>

          <button
            onClick={onMarketAnalysis}
            disabled={marketLoading}
          >
            {marketLoading
              ? "Analyzing..."
              : "Analyze Market →"}
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // MARKET ANALYSIS
  // ==========================================

  if (activeStage === "marketAnalysis") {
    if (!hasAnalysis("marketAnalysis")) {
      return (
        <div className="empty-analysis">
          <div className="empty-analysis-icon">
            02
          </div>

          <h3>Market Analysis</h3>

          <p>
            Your Executive Summary is
            complete. Generate the Market
            Analysis to continue.
          </p>

          <button
            className="analysis-action-btn"
            onClick={onMarketAnalysis}
            disabled={marketLoading}
          >
            {marketLoading
              ? "Analyzing Market..."
              : "Analyze Market →"}
          </button>

          {marketError && (
            <div className="dashboard-error">
              {marketError}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="analysis-result">
        <AnalysisHeader
          stage="02"
          title="Market Analysis Complete"
        />

        <AnalysisObject
          object={startup.marketAnalysis}
        />
      </div>
    );
  }

  // ==========================================
  // COMPETITOR ANALYSIS
  // ==========================================

  if (activeStage === "competitorAnalysis") {
    if (!hasAnalysis("competitorAnalysis")) {
      return (
        <div className="empty-analysis">
          <div className="empty-analysis-icon">
            03
          </div>

          <h3>Competitor Analysis</h3>

          <p>
            Your Market Analysis is
            complete. Analyze the competitive
            landscape to continue.
          </p>

          <button
            className="analysis-action-btn"
            onClick={onCompetitorAnalysis}
            disabled={competitorLoading}
          >
            {competitorLoading
              ? "Analyzing Competition..."
              : "Analyze Competitors →"}
          </button>

          {competitorError && (
            <div className="dashboard-error">
              {competitorError}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="analysis-result competitor-result">
        <AnalysisHeader
          stage="03"
          title="Competitor Analysis Complete"
        />

        <CompetitorAnalysis
          data={
            startup.competitorAnalysis
          }
        />
      </div>
    );
  }

  // ==========================================
  // SWOT ANALYSIS
  // ==========================================

  if (activeStage === "swotAnalysis") {
    return (
      <SWOTAnalysis
        startupId={startup._id}
      />
    );
  }

  // ==========================================
  // FUTURE STAGES
  // ==========================================

  const stage = stages.find(
    (item) => item.key === activeStage
  );

  return (
    <div className="empty-analysis">
      <div className="locked-icon">
        🔒
      </div>

      <span>
        STAGE {stage?.number}
      </span>

      <h3>{stage?.name}</h3>

      <p>
        This analysis stage will become
        available after the previous stage
        is completed.
      </p>
    </div>
  );
};

// ==========================================
// ANALYSIS HEADER
// ==========================================

const AnalysisHeader = ({
  stage,
  title,
}) => {
  return (
    <div className="analysis-result-header">
      <div>
        <span className="analysis-stage-label">
          STAGE {stage}
        </span>

        <h3>{title}</h3>
      </div>

      <div className="completed-badge">
        ✓ Completed
      </div>
    </div>
  );
};

// ==========================================
// COMPETITOR ANALYSIS
// ==========================================

const CompetitorAnalysis = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  return (
    <div className="competitor-analysis">

      {/* ======================================
          COMPETITORS
      ====================================== */}

      {data.competitors?.length > 0 && (
        <section className="competitor-section">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                COMPETITIVE LANDSCAPE
              </span>

              <h3>
                Key Competitors
              </h3>

              <p>
                Businesses competing for the
                same target audience and market.
              </p>
            </div>

            <div className="competitor-count">
              {data.competitors.length}
              <span>
                competitors
              </span>
            </div>
          </div>

          <div className="competitor-grid">

            {data.competitors.map(
              (competitor, index) => (
                <div
                  className="competitor-card"
                  key={
                    competitor.name ||
                    index
                  }
                >

                  <div className="competitor-card-top">

                    <div className="competitor-number">
                      0{index + 1}
                    </div>

                    <div>
                      <h4>
                        {competitor.name}
                      </h4>

                      <p className="competitor-description">
                        {
                          competitor.description
                        }
                      </p>
                    </div>

                  </div>

                  {/* Strengths */}

                  <div className="competitor-column">

                    <h5 className="strength-title">
                      <span>+</span>
                      Strengths
                    </h5>

                    <ul>
                      {competitor.strengths?.map(
                        (strength, i) => (
                          <li key={i}>
                            {strength}
                          </li>
                        )
                      )}
                    </ul>

                  </div>

                  {/* Weaknesses */}

                  <div className="competitor-column">

                    <h5 className="weakness-title">
                      <span>−</span>
                      Weaknesses
                    </h5>

                    <ul>
                      {competitor.weaknesses?.map(
                        (weakness, i) => (
                          <li key={i}>
                            {weakness}
                          </li>
                        )
                      )}
                    </ul>

                  </div>

                  {/* Our Advantage */}

                  <div className="advantage-box">

                    <span>
                      YOUR ADVANTAGE
                    </span>

                    <p>
                      {
                        competitor.ourAdvantage
                      }
                    </p>

                  </div>

                </div>
              )
            )}

          </div>
        </section>
      )}

      {/* ======================================
          STARTUP POSITION
      ====================================== */}

      {data.startupPosition && (
        <section className="startup-position-section">

          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                YOUR POSITION
              </span>

              <h3>
                Startup Competitive Position
              </h3>

              <p>
                How your startup compares
                against the existing market.
              </p>
            </div>
          </div>

          <div className="startup-position-card">

            <div className="startup-position-header">

              <div className="startup-avatar">
                {data.startupPosition.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </div>

              <div>
                <span>
                  STARTUP
                </span>

                <h3>
                  {
                    data.startupPosition
                      .name
                  }
                </h3>
              </div>

            </div>

            <div className="position-grid">

              {/* Strengths */}

              <div className="position-column">

                <h4 className="strength-title">
                  <span>+</span>
                  Strengths
                </h4>

                <ul>
                  {data.startupPosition.strengths?.map(
                    (strength, index) => (
                      <li key={index}>
                        {strength}
                      </li>
                    )
                  )}
                </ul>

              </div>

              {/* Weaknesses */}

              <div className="position-column">

                <h4 className="weakness-title">
                  <span>−</span>
                  Weaknesses
                </h4>

                <ul>
                  {data.startupPosition.weaknesses?.map(
                    (weakness, index) => (
                      <li key={index}>
                        {weakness}
                      </li>
                    )
                  )}
                </ul>

              </div>

            </div>

            {/* Advantage */}

            <div className="startup-advantage">

              <span>
                COMPETITIVE ADVANTAGE
              </span>

              <p>
                {
                  data.startupPosition
                    .ourAdvantage
                }
              </p>

            </div>

          </div>
        </section>
      )}

      {/* ======================================
          COMPETITIVE INTENSITY
      ====================================== */}

      <div className="competition-summary-grid">

        {data.competitiveIntensity && (
          <div className="competition-summary-card">

            <span>
              COMPETITIVE INTENSITY
            </span>

            <strong>
              {data.competitiveIntensity}
            </strong>

          </div>
        )}

        {data.confidence !== undefined && (
          <div className="competition-summary-card">

            <span>
              AI CONFIDENCE
            </span>

            <strong>
              {data.confidence}%
            </strong>

          </div>
        )}

      </div>

      {/* ======================================
          OPPORTUNITY
      ====================================== */}

      {data.competitiveOpportunity && (
        <div className="recommendation-card">

          <span>
            COMPETITIVE OPPORTUNITY
          </span>

          <p>
            {data.competitiveOpportunity}
          </p>

        </div>
      )}

      {/* ======================================
          RECOMMENDATION
      ====================================== */}

      {data.recommendation && (
        <div className="recommendation-card">

          <span>
            FOUNDER RECOMMENDATION
          </span>

          <p>
            {data.recommendation}
          </p>

        </div>
      )}

    </div>
  );
};

// ==========================================
// GENERIC OBJECT RENDERER
// ==========================================

const AnalysisObject = ({
  object,
}) => {
  if (!object) {
    return null;
  }

  return (
    <div className="analysis-object">

      {Object.entries(object).map(
        ([key, value]) => {

          if (
            key === "_id" ||
            key === "__v"
          ) {
            return null;
          }

          const title = key
            .replace(
              /([A-Z])/g,
              " $1"
            )
            .replace(
              /^./,
              (letter) =>
                letter.toUpperCase()
            );

          return (
            <div
              className="analysis-card"
              key={key}
            >

              <h4>
                {title}
              </h4>

              <AnalysisValue
                value={value}
              />

            </div>
          );
        }
      )}

    </div>
  );
};

// ==========================================
// VALUE RENDERER
// ==========================================

const AnalysisValue = ({
  value,
}) => {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return (
      <p>
        {String(value)}
      </p>
    );
  }

  if (Array.isArray(value)) {
    return (
      <ul>
        {value.map(
          (item, index) => (
            <li key={index}>
              {typeof item ===
              "object"
                ? JSON.stringify(item)
                : item}
            </li>
          )
        )}
      </ul>
    );
  }

  if (
    typeof value === "object"
  ) {
    return (
      <div className="nested-analysis">
        {Object.entries(value).map(
          ([key, nestedValue]) => (
            <div key={key}>

              <strong>
                {key}
              </strong>

              <AnalysisValue
                value={
                  nestedValue
                }
              />

            </div>
          )
        )}
      </div>
    );
  }

  return null;
};

export default AnalysisRenderer;