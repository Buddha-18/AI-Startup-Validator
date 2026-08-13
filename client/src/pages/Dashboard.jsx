import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardWelcome from "../components/dashboard/DashboardWelcome";
import ValidatorSection from "../components/dashboard/ValidatorSection";
import StartupBar from "../components/dashboard/StartupBar";
import AnalysisWorkflow from "../components/dashboard/AnalysisWorkflow";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [startup, setStartup] = useState(null);

  const [activeStage, setActiveStage] =
    useState("executiveSummary");

  const [formVisible, setFormVisible] =
    useState(true);

  const [loadingStartup, setLoadingStartup] =
    useState(true);

  // ==========================================
  // LOADING STATES
  // ==========================================

  const [analysisLoading, setAnalysisLoading] =
    useState(false);

  const [marketLoading, setMarketLoading] =
    useState(false);

  const [competitorLoading, setCompetitorLoading] =
    useState(false);

  // ==========================================
  // ERROR STATES
  // ==========================================

  const [error, setError] =
    useState("");

  const [marketError, setMarketError] =
    useState("");

  const [competitorError, setCompetitorError] =
    useState("");

  // ==========================================
  // FETCH STARTUP
  // ==========================================

  useEffect(() => {
    fetchStartup();
  }, []);

  const fetchStartup = async () => {
    try {
      setLoadingStartup(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.get(
        "/startups/my-startup",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const existingStartup =
        response.data?.startup ||
        response.data?.data ||
        response.data;

      setStartup(existingStartup);

      if (existingStartup?._id) {
        setFormVisible(false);
      }

    } catch (err) {
      console.error(
        "Fetch Startup Error:",
        err
      );

      if (
        err.response?.status === 401
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
        return;
      }

      if (
        err.response?.status === 404
      ) {
        setStartup(null);
        setFormVisible(true);
      } else {
        setError(
          err.response?.data?.message ||
          "Unable to load your startup."
        );
      }

    } finally {
      setLoadingStartup(false);
    }
  };

  // ==========================================
  // EXECUTIVE SUMMARY
  // ==========================================

  const handleSubmit = async (
    formData
  ) => {
    try {
      setAnalysisLoading(true);

      setError("");
      setMarketError("");
      setCompetitorError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await API.post(
        "/analysis/executive-summary",
        formData,
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
          "Failed to generate executive summary"
        );
      }

      console.log(
        "Executive Summary:",
        result.data
      );

      setStartup(result.data);

      setActiveStage(
        "executiveSummary"
      );

      setFormVisible(false);

      setTimeout(() => {
        document
          .getElementById(
            "analysis-workspace"
          )
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 100);

    } catch (err) {
      console.error(
        "Executive Summary Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to analyze your startup."
      );

    } finally {
      setAnalysisLoading(false);
    }
  };

  // ==========================================
  // MARKET ANALYSIS
  // ==========================================

  const handleMarketAnalysis =
    async () => {
      try {
        setMarketLoading(true);
        setMarketError("");

        const token =
          localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        if (!startup?._id) {
          throw new Error(
            "Startup ID not found."
          );
        }

        const marketData = {
          startupId:
            startup._id,

          startupName:
            startup.startupName,

          idea:
            startup.idea,

          industry:
            startup.industry,

          country:
            startup.country,

          audience:
            startup.audience,

          budget:
            startup.budget,

          teamSize:
            startup.teamSize,
        };

        console.log(
          "Sending Market Analysis:",
          marketData
        );

        const response =
          await API.post(
            "/analysis/market",
            marketData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const result =
          response.data;

        if (!result.success) {
          throw new Error(
            result.message ||
            "Failed to generate market analysis"
          );
        }

        console.log(
          "Market Analysis:",
          result.data
        );

        setStartup(
          (previous) => ({
            ...previous,
            marketAnalysis:
              result.data,
          })
        );

        setActiveStage(
          "marketAnalysis"
        );

      } catch (err) {
        console.error(
          "Market Analysis Error:",
          err
        );

        setMarketError(
          err.response?.data
            ?.message ||
          err.message ||
          "Failed to generate market analysis."
        );

      } finally {
        setMarketLoading(false);
      }
    };

  // ==========================================
  // COMPETITOR ANALYSIS
  // ==========================================

  const handleCompetitorAnalysis =
    async () => {
      try {
        setCompetitorLoading(true);
        setCompetitorError("");

        const token =
          localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        if (!startup?._id) {
          throw new Error(
            "Startup ID not found."
          );
        }

        console.log(
          "Generating Competitor Analysis for:",
          startup._id
        );

        const response =
          await API.post(
            "/analysis/competitor",
            {
              startupId:
                startup._id,
            },
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const result =
          response.data;

        if (!result.success) {
          throw new Error(
            result.message ||
            "Failed to generate competitor analysis"
          );
        }

        console.log(
          "Competitor Analysis:",
          result.data
        );

        // Update React state
        setStartup(
          (previous) => ({
            ...previous,
            competitorAnalysis:
              result.data,
          })
        );

        // Keep user on Stage 03
        setActiveStage(
          "competitorAnalysis"
        );

      } catch (err) {
        console.error(
          "Competitor Analysis Error:",
          err
        );

        setCompetitorError(
          err.response?.data
            ?.message ||
          err.message ||
          "Failed to generate competitor analysis."
        );

      } finally {
        setCompetitorLoading(false);
      }
    };

  // ==========================================
  // NEW ANALYSIS
  // ==========================================

  const handleNewAnalysis = () => {
    setStartup(null);

    setFormVisible(true);

    setActiveStage(
      "executiveSummary"
    );

    setError("");
    setMarketError("");
    setCompetitorError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // SHOW FORM
  // ==========================================

  const handleViewForm = () => {
    setFormVisible(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loadingStartup) {
    return (
      <div className="dashboard-loading">

        <div className="loader"></div>

        <p>
          Loading your dashboard...
        </p>

      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div className="dashboard">

      <DashboardHeader
        onNewAnalysis={
          handleNewAnalysis
        }
        onLogout={
          handleLogout
        }
      />

      <main className="dashboard-main">

        <DashboardWelcome
          startup={startup}
        />

        {/* General Error */}

        {error && (
          <div className="dashboard-error">
            {error}
          </div>
        )}

        {/* Validator Form */}

        {formVisible && (
          <ValidatorSection
            onSubmit={
              handleSubmit
            }
            loading={
              analysisLoading
            }
          />
        )}

        {/* Existing Startup */}

        {startup &&
          !formVisible && (
            <StartupBar
              startup={startup}
              onViewForm={
                handleViewForm
              }
            />
          )}

        {/* Analysis Workflow */}

        <AnalysisWorkflow
          startup={startup}
          activeStage={
            activeStage
          }
          setActiveStage={
            setActiveStage
          }

          marketLoading={
            marketLoading
          }

          marketError={
            marketError
          }

          onMarketAnalysis={
            handleMarketAnalysis
          }

          competitorLoading={
            competitorLoading
          }

          competitorError={
            competitorError
          }

          onCompetitorAnalysis={
            handleCompetitorAnalysis
          }

          onNewAnalysis={
            handleNewAnalysis
          }
        />

      </main>

    </div>
  );
};

export default Dashboard;