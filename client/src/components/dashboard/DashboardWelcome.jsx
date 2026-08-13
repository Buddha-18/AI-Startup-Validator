import React from "react";

const DashboardWelcome = ({
  startup,
}) => {
  return (
    <section className="welcome">

      <div>

        <span className="eyebrow">
          DASHBOARD
        </span>

        <h1>
          Welcome back
        </h1>

        <p>
          Validate your startup idea and
          explore AI-powered business
          insights.
        </p>

      </div>

      {startup && (
        <div className="current-startup">

          <span>
            CURRENT STARTUP
          </span>

          <strong>
            {startup.startupName}
          </strong>

          <small>
            {startup.industry}
          </small>

        </div>
      )}

    </section>
  );
};

export default DashboardWelcome;