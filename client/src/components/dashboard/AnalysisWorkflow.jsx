import React from "react";

import StageTabs from "./StageTabs";
import AnalysisWorkspace from "./AnalysisWorkspace";

const AnalysisWorkflow = ({
  startup,
  activeStage,
  setActiveStage,

  // Market Analysis
  marketLoading,
  marketError,
  onMarketAnalysis,

  // Competitor Analysis
  competitorLoading,
  competitorError,
  onCompetitorAnalysis,

  onNewAnalysis,
}) => {
  const stages = [
    {
      key: "executiveSummary",
      number: "01",
      name: "Summary",
    },
    {
      key: "marketAnalysis",
      number: "02",
      name: "Market",
    },
    {
      key: "competitorAnalysis",
      number: "03",
      name: "Competition",
    },
    {
      key: "swotAnalysis",
      number: "04",
      name: "SWOT",
    },
    {
      key: "revenueAnalysis",
      number: "05",
      name: "Revenue",
    },
    {
      key: "overallScore",
      number: "06",
      name: "Score",
    },
    {
      key: "finalReport",
      number: "07",
      name: "Final Report",
    },
  ];

  // ==========================================
  // CHECK ANALYSIS
  // ==========================================

  const hasAnalysis = (key) => {
    if (!startup) {
      return false;
    }

    const value = startup[key];

    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return false;
    }

    if (
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      return Object.keys(value).length > 0;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return true;
  };

  // ==========================================
  // CHECK IF STAGE IS UNLOCKED
  // ==========================================

  const isUnlocked = (stage) => {
    switch (stage) {
      case "executiveSummary":
        return true;

      case "marketAnalysis":
        return hasAnalysis(
          "executiveSummary"
        );

      case "competitorAnalysis":
        return hasAnalysis(
          "marketAnalysis"
        );

      case "swotAnalysis":
        return hasAnalysis(
          "competitorAnalysis"
        );

      case "revenueAnalysis":
        return hasAnalysis(
          "swotAnalysis"
        );

      case "overallScore":
        return hasAnalysis(
          "revenueAnalysis"
        );

      case "finalReport":
        return hasAnalysis(
          "overallScore"
        );

      default:
        return false;
    }
  };

  // ==========================================
  // COMPLETED COUNT
  // ==========================================

  const completedCount =
    stages.filter((stage) =>
      hasAnalysis(stage.key)
    ).length;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <section className="analysis-workflow">
      <div className="workflow-header">
        <div>
          <span className="eyebrow">
            ANALYSIS WORKFLOW
          </span>

          <h2>
            Startup Validation
          </h2>
        </div>

        <span className="progress">
          {completedCount} /{" "}
          {stages.length} completed
        </span>
      </div>

      <StageTabs
        stages={stages}
        activeStage={activeStage}
        setActiveStage={
          setActiveStage
        }
        hasAnalysis={
          hasAnalysis
        }
        isUnlocked={
          isUnlocked
        }
      />

      <AnalysisWorkspace
        startup={startup}
        activeStage={activeStage}
        hasAnalysis={hasAnalysis}

        /* Market */
        marketLoading={
          marketLoading
        }

        marketError={
          marketError
        }

        onMarketAnalysis={
          onMarketAnalysis
        }

        /* Competitor */
        competitorLoading={
          competitorLoading
        }

        competitorError={
          competitorError
        }

        onCompetitorAnalysis={
          onCompetitorAnalysis
        }

        onNewAnalysis={
          onNewAnalysis
        }

        stages={stages}
      />
    </section>
  );
};

export default AnalysisWorkflow;