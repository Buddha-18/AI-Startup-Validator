import React, { useState } from "react";

const ValidatorForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    startupName: "",
    idea: "",
    industry: "",
    country: "India",
    audience: "",
    budget: "",
    teamSize: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      className="validator-card"
      onSubmit={handleSubmit}
    >

      {/* ================= SECTION 01 ================= */}

      <div className="form-section">

        <div className="section-title">

          <div className="section-number">
            01
          </div>

          <div>
            <h2>
              Tell us about your idea
            </h2>

            <p>
              Start with the basics of your startup.
            </p>
          </div>

        </div>


        {/* Startup Name */}

        <div className="form-group">

          <label>
            Startup Name
            <span>*</span>
          </label>

          <input
            type="text"
            name="startupName"
            value={formData.startupName}
            onChange={handleChange}
            placeholder="Enter your startup name"
            required
          />

        </div>


        {/* Startup Idea */}

        <div className="form-group">

          <label>
            Describe Your Startup Idea
            <span>*</span>
          </label>

          <textarea
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            placeholder="Describe your startup idea, the problem it solves, and how your solution works..."
            rows="6"
            required
          />

          <small>
            Be as detailed as possible. More information
            helps AI provide better insights.
          </small>

        </div>

      </div>


      <div className="form-divider"></div>


      {/* ================= SECTION 02 ================= */}

      <div className="form-section">

        <div className="section-title">

          <div className="section-number">
            02
          </div>

          <div>
            <h2>
              Business Details
            </h2>

            <p>
              Help us understand your target market.
            </p>
          </div>

        </div>


        <div className="form-grid">

          {/* Industry */}

          <div className="form-group">

            <label>
              Industry
              <span>*</span>
            </label>

            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
            >
              <option value="">
                Select industry
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="FinTech">
                FinTech
              </option>

              <option value="HealthTech">
                HealthTech
              </option>

              <option value="EdTech">
                EdTech
              </option>

              <option value="Agriculture">
                Agriculture
              </option>

              <option value="E-commerce">
                E-commerce
              </option>

              <option value="SaaS">
                SaaS
              </option>

              <option value="Food">
                Food & Beverage
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* Country */}

          <div className="form-group">

            <label>
              Target Country
              <span>*</span>
            </label>

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            >

              <option value="India">
                India
              </option>

              <option value="USA">
                United States
              </option>

              <option value="UK">
                United Kingdom
              </option>

              <option value="Canada">
                Canada
              </option>

              <option value="Australia">
                Australia
              </option>

              <option value="Germany">
                Germany
              </option>

              <option value="Singapore">
                Singapore
              </option>

              <option value="Global">
                Global
              </option>

            </select>

          </div>


          {/* Target Audience */}

          <div className="form-group full-width">

            <label>
              Target Audience
              <span>*</span>
            </label>

            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              placeholder="e.g. Small businesses, students, restaurants..."
              required
            />

          </div>


          {/* Budget */}

          <div className="form-group">

            <label>
              Estimated Budget
              <span>*</span>
            </label>

            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            >

              <option value="">
                Select budget
              </option>

              <option value="Under $5,000">
                Under $5,000
              </option>

              <option value="$5,000 - $20,000">
                $5,000 - $20,000
              </option>

              <option value="$20,000 - $50,000">
                $20,000 - $50,000
              </option>

              <option value="$50,000 - $100,000">
                $50,000 - $100,000
              </option>

              <option value="Above $100,000">
                Above $100,000
              </option>

            </select>

          </div>


          {/* Team Size */}

          <div className="form-group">

            <label>
              Team Size
              <span>*</span>
            </label>

            <select
              name="teamSize"
              value={formData.teamSize}
              onChange={handleChange}
              required
            >

              <option value="">
                Select team size
              </option>

              <option value="Solo Founder">
                Solo Founder
              </option>

              <option value="2 - 5">
                2 - 5 people
              </option>

              <option value="6 - 10">
                6 - 10 people
              </option>

              <option value="11 - 25">
                11 - 25 people
              </option>

              <option value="25+">
                25+ people
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ================= SUBMIT ================= */}

      <div className="submit-section">

        <div className="privacy-text">
          🔒 Your startup information is securely processed.
        </div>

        <button
          type="submit"
          className="validate-btn"
          disabled={loading}
        >

          {loading ? (
            <>
              <span>
                AI is analyzing...
              </span>

              <span>
                ⏳
              </span>
            </>
          ) : (
            <>
              <span>
                Analyze My Startup
              </span>

              <span>
                →
              </span>
            </>
          )}

        </button>

      </div>

    </form>
  );
};

export default ValidatorForm;

