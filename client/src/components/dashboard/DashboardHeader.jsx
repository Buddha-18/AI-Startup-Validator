import React from "react";

const DashboardHeader = ({
  onNewAnalysis,
  onLogout,
}) => {
  return (
    <header className="dashboard-header">

      <div className="dashboard-brand">

        <div className="brand-icon">
          AI
        </div>

        <div>
          <h2>
            Startup Validator
          </h2>

          <span>
            AI-powered validation
          </span>
        </div>

      </div>

      <div className="header-actions">

        <button
          className="new-analysis-btn"
          onClick={onNewAnalysis}
        >
          + New Analysis
        </button>

        <button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default DashboardHeader;