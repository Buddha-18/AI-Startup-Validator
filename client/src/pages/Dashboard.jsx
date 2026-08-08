import React from "react";
import "./Dashboard.css";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: "Total Validations",
      value: "24",
      description: "Startup ideas analyzed",
      icon: "🚀",
    },
    {
      title: "Average Score",
      value: "82%",
      description: "Validation accuracy",
      icon: "📊",
    },
    {
      title: "Market Insights",
      value: "18",
      description: "Reports generated",
      icon: "💡",
    },
    {
      title: "Saved Ideas",
      value: "12",
      description: "Ideas bookmarked",
      icon: "⭐",
    },
  ];

  const validations = [
    {
      name: "AI Healthcare Assistant",
      score: "91%",
      status: "Strong Potential",
      date: "Today",
    },
    {
      name: "Smart Agriculture Platform",
      score: "78%",
      status: "Good Opportunity",
      date: "Yesterday",
    },
    {
      name: "Personal Finance AI",
      score: "85%",
      status: "Promising",
      date: "3 days ago",
    },
  ];

  return (
    <div className="dashboard">

      {/* Top Navbar */}

      <nav className="dashboard-navbar">

        <div className="brand">
          <span className="brand-logo">
            AI
          </span>
          <h2>Startup Validator</h2>
        </div>


        <div className="nav-profile">

          <div className="user-info">
            <span>
              {user?.name || "User"}
            </span>
            <small>
              Founder
            </small>
          </div>

          <div className="avatar">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}
          </div>

        </div>

      </nav>



      {/* Main Container */}

      <main className="dashboard-container">


        {/* Welcome Hero */}

        <section className="welcome-section">

          <div className="welcome-content">

            <p className="greeting">
              Welcome back 👋
            </p>

            <h1>
              Validate your next
              <span> startup idea </span>
              with AI
            </h1>

            <p className="welcome-description">
              Analyze market potential, competition,
              customer demand and growth opportunities
              before building your product.
            </p>


            <button className="primary-btn">
              + Validate New Startup
            </button>

          </div>



          <div className="hero-card">

            <div className="ai-circle">
              AI
            </div>

            <h3>
              AI Powered Analysis
            </h3>

            <p>
              Get intelligent insights about your
              startup idea within minutes.
            </p>

          </div>


        </section>




        {/* Statistics */}

        <section className="stats-grid">

          {
            stats.map((item,index)=>(
              <div 
                className="stat-card"
                key={index}
              >

                <div className="stat-icon">
                  {item.icon}
                </div>

                <div>
                  <h2>
                    {item.value}
                  </h2>

                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.description}
                  </p>
                </div>


              </div>
            ))
          }

        </section>




        {/* Quick Actions */}


        <section className="section">

          <div className="section-header">

            <h2>
              Quick Actions
            </h2>

          </div>



          <div className="actions-grid">


            <div className="action-card">

              <div>
                🔍
              </div>

              <h3>
                Validate Idea
              </h3>

              <p>
                Check your startup idea potential.
              </p>

            </div>




            <div className="action-card">

              <div>
                📈
              </div>

              <h3>
                Market Research
              </h3>

              <p>
                Understand your target market.
              </p>

            </div>




            <div className="action-card">

              <div>
                ⚡
              </div>

              <h3>
                Generate Report
              </h3>

              <p>
                Create detailed AI insights.
              </p>

            </div>


          </div>


        </section>






        {/* Recent Validations */}


        <section className="section">


          <div className="section-header">

            <h2>
              Recent Validations
            </h2>

            <button>
              View All
            </button>

          </div>



          <div className="validation-table">


            {
              validations.map((item,index)=>(

                <div 
                  className="validation-row"
                  key={index}
                >

                  <div className="startup-name">

                    <div className="startup-icon">
                      🚀
                    </div>

                    <div>

                      <h4>
                        {item.name}
                      </h4>

                      <span>
                        {item.date}
                      </span>

                    </div>

                  </div>




                  <div className="score">
                    {item.score}
                  </div>



                  <div className="status">
                    {item.status}
                  </div>


                </div>

              ))
            }



          </div>



        </section>






        {/* User Profile */}


        <section className="profile-card">


          <div className="profile-avatar">

            {
              user?.name
              ? user.name.charAt(0)
              : "U"
            }

          </div>


          <div className="profile-details">

            <h3>
              {user?.name || "Startup Founder"}
            </h3>

            <p>
              {user?.email || "Your registered email"}
            </p>


            <span>
              Free Plan
            </span>

          </div>


          <button>
            Manage Profile
          </button>


        </section>




      </main>


    </div>
  );
};


export default Dashboard;