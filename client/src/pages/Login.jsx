import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await login(formData);

      if (res.success) {
        navigate("/validate");
      } else {
        setError(res.message || "Login Failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to login. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-header">
          <h1>AI Startup Validator</h1>
          <p>Welcome Back 👋</p>
        </div>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="bottom-text">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;