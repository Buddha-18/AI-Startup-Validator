import React from "react";

import AnalysisRenderer from "./AnalysisRenderer";

const AnalysisWorkspace = ({
  startup,
  activeStage,
  hasAnalysis,

  // Market
  marketLoading,
  marketError,
  onMarketAnalysis,

  // Competitor
  competitorLoading,
  competitorError,
  onCompetitorAnalysis,

  onNewAnalysis,
  stages,
}) => {
  return (
    <div
      id="analysis-workspace"
      className="analysis-workspace"
    >
      <AnalysisRenderer
        startup={startup}
        activeStage={activeStage}
        hasAnalysis={hasAnalysis}

        // Market
        marketLoading={
          marketLoading
        }
        marketError={
          marketError
        }
        onMarketAnalysis={
          onMarketAnalysis
        }

        // Competitor
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
    </div>
  );
};

export default AnalysisWorkspace;