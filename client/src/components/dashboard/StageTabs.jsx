import React from "react";

const StageTabs = ({
  stages,
  activeStage,
  setActiveStage,
  hasAnalysis,
  isUnlocked,
}) => {
  return (
    <div className="stage-tabs">

      {stages.map((stage) => {

        const completed =
          hasAnalysis(stage.key);

        const unlocked =
          isUnlocked(stage.key);

        const active =
          activeStage === stage.key;

        return (
          <button
            key={stage.key}
            className={`
              stage-tab
              ${active ? "active" : ""}
              ${
                completed
                  ? "completed"
                  : ""
              }
              ${
                !unlocked
                  ? "locked"
                  : ""
              }
            `}
            disabled={!unlocked}
            onClick={() => {

              if (unlocked) {
                setActiveStage(
                  stage.key
                );
              }

            }}
          >

            <span className="stage-number">
              {stage.number}
            </span>

            <span className="stage-name">
              {stage.name}
            </span>

            <span className="stage-status">

              {completed
                ? "✓"
                : !unlocked
                ? "🔒"
                : "○"}

            </span>

          </button>
        );
      })}

    </div>
  );
};

export default StageTabs;