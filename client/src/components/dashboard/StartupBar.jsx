import React from "react";

const StartupBar = ({
  startup,
  onViewForm,
}) => {
  return (
    <section className="startup-bar">

      <div>

        <span>
          YOUR STARTUP
        </span>

        <strong>
          {startup.startupName}
        </strong>

      </div>

      <button
        onClick={onViewForm}
      >
        View Validator Form
      </button>

    </section>
  );
};

export default StartupBar;