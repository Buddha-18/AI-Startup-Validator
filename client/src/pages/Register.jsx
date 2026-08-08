import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      return {
        text: "Weak",
        color: "#ef4444",
      };

    if (score === 2 || score === 3)
      return {
        text: "Medium",
        color: "#f59e0b",
      };

    return {
      text: "Strong",
      color: "#22c55e",
    };
  };

  const strength = getStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const res = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.success) {
        navigate("/validate");
      } else {
        setError(res.message || "Registration failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to register."
      );
    }

    setLoading(false);
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">
          <h1>Create Account</h1>

          <p>
            Start validating startup ideas with AI
          </p>
        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="john@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

            {formData.password && (
              <small
                style={{
                  color: strength.color,
                  marginTop: "8px",
                }}
              >
                Password Strength :
                {" "}
                {strength.text}
              </small>
            )}

          </div>

          <div className="input-group">

            <label>
              Confirm Password
            </label>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="register-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="bottom-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;