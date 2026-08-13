import React, { useEffect, useState } from "react";
import API from "../../api/api";

import "./SWOTAnalysis.css";

const SWOTAnalysis = ({ startupId }) => {
  const [swot, setSwot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH SWOT
  // ==========================================

  const fetchSWOT = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found.");
      }

      const response = await API.get(
        `/swot/${startupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = response.data;

      if (!result.success) {
        throw new Error(
          result.message ||
            "Failed to load SWOT analysis."
        );
      }

      setSwot(result.data);

    } catch (err) {
      console.error(
        "SWOT fetch error:",
        err
      );

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load SWOT analysis."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // GENERATE SWOT
  // ==========================================

    const generateSWOT = async () => {
  try {
    setGenerating(true);
    setError("");

    const token =
      localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Authentication token not found."
      );
    }

    if (!startupId) {
      throw new Error(
        "Startup ID not found."
      );
    }

    const response = await API.post(
      `/swot/${startupId}`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    const result = response.data;

    if (!result.success) {
      throw new Error(
        result.message ||
          "Failed to generate SWOT analysis."
      );
    }

    console.log(
      "SWOT Analysis:",
      result.data
    );

    setSwot(result.data);
    setError("");

  } catch (err) {
    console.error(
      "SWOT generation error:",
      err
    );

    setError(
      err.response?.data?.message ||
        err.message ||
        "Failed to generate SWOT analysis."
    );

  } finally {
    setGenerating(false);
  }
};

  // ==========================================
  // LOAD SWOT
  // ==========================================

  useEffect(() => {
    if (!startupId) {
      setError("Startup ID not found.");
      setLoading(false);
      return;
    }

    fetchSWOT();
  }, [startupId]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="swot-container">
        <div className="swot-loading">
          Loading SWOT analysis...
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR / NO SWOT
  // ==========================================

  if (error && !swot) {
    return (
      <div className="swot-container">

        <div className="swot-header">

          <span className="swot-eyebrow">
            STRATEGIC ANALYSIS
          </span>

          <h2>
            SWOT Analysis
          </h2>

          <p>
            Understand your startup's
            internal strengths and
            weaknesses, along with
            external opportunities
            and threats.
          </p>

          <button
            className="swot-generate-btn"
            onClick={generateSWOT}
            disabled={generating}
          >
            {generating
              ? "Generating..."
              : "Generate SWOT"}
          </button>

        </div>

        <div className="swot-error">
          <span>{error}</span>

          <button onClick={fetchSWOT}>
            Retry
          </button>
        </div>

      </div>
    );
  }

  // ==========================================
  // SWOT RESULT
  // ==========================================

  return (
    <div className="swot-container">

      <div className="swot-header">

        <div>
          <span className="swot-eyebrow">
            STRATEGIC ANALYSIS
          </span>

          <h2>
            SWOT Analysis
          </h2>

          <p>
            Understand your startup's
            internal strengths and
            weaknesses, along with
            external opportunities
            and threats.
          </p>
        </div>

        <button
          className="swot-generate-btn"
          onClick={generateSWOT}
          disabled={generating}
        >
          {generating
            ? "Generating..."
            : "Regenerate SWOT"}
        </button>

      </div>

      {error && (
        <div className="swot-error">
          <span>{error}</span>

          <button onClick={fetchSWOT}>
            Retry
          </button>
        </div>
      )}

      {swot && (
        <>
          <div className="swot-grid">

            <SWOTCard
              title="Strengths"
              type="strengths"
              items={swot.strengths}
            />

            <SWOTCard
              title="Weaknesses"
              type="weaknesses"
              items={swot.weaknesses}
            />

            <SWOTCard
              title="Opportunities"
              type="opportunities"
              items={swot.opportunities}
            />

            <SWOTCard
              title="Threats"
              type="threats"
              items={swot.threats}
            />

          </div>

          {swot.strategicInsights && (
            <div className="swot-section">

              <h3>
                Strategic Insights
              </h3>

              <ul>
                {swot.strategicInsights.map((item, index) => (
  <li key={index}>
    {typeof item === "object" && item !== null
      ? (
        <>
          {item.title && (
            <strong>{item.title}</strong>
          )}

          {item.description && (
            <p>{item.description}</p>
          )}
        </>
      )
      : item}
  </li>
))}
              </ul>

            </div>
          )}

          {swot.recommendation && (
            <div className="swot-section">

              <h3>
                Strategic Recommendation
              </h3>

              <p>
                {swot.recommendation}
              </p>

            </div>
          )}

          {swot.confidence !== undefined && (
            <div className="swot-confidence">

              <span>
                AI Confidence
              </span>

              <strong>
                {swot.confidence}%
              </strong>

            </div>
          )}

        </>
      )}

    </div>
  );
};

// ==========================================
// SWOT CARD
// ==========================================

const SWOTCard = ({
  title,
  type,
  items,
}) => {
  return (
    <div className={`swot-card ${type}`}>

      <div className="swot-card-header">
        <h3>{title}</h3>
      </div>

      <ul>
        {(items || []).map((item, index) => (
          <li key={index}>

            {typeof item === "object" && item !== null ? (
              <div className="swot-item-content">

                {item.title && (
                  <strong>
                    {item.title}
                  </strong>
                )}

                {item.description && (
                  <p>
                    {item.description}
                  </p>
                )}

              </div>
            ) : (
              item
            )}

          </li>
        ))}
      </ul>

    </div>
  );
};

export default SWOTAnalysis;