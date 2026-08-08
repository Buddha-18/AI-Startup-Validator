import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
   const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate("/validate");
    } else {
      navigate("/register");
    }
  };
  return (
    <nav className="navbar">
      <div className="logo">
        AI Startup Validator
      </div>

      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>About</li>
      </ul>

       <button onClick={handleStart}>
          Get Started
        </button>
    </nav>
  );
}

export default Navbar;