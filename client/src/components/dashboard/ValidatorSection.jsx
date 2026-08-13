import React from "react";

import ValidatorForm from "../validator/ValidatorForm";

const ValidatorSection = ({
  onSubmit,
  loading,
}) => {
  return (
    <section className="validator-container">

      <div className="validator-heading">

        <span>
          STARTUP VALIDATOR
        </span>

        <h2>
          Tell us about your startup
        </h2>

        <p>
          Provide the details below and
          our AI will analyze your startup
          idea.
        </p>

      </div>

      <ValidatorForm
        onSubmit={onSubmit}
        loading={loading}
      />

    </section>
  );
};

export default ValidatorSection;