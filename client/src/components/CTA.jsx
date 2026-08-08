import "./CTA.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CTA() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <section className="cta">
      <motion.div
        className="cta-box"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h2>Ready to Validate Your Startup?</h2>

        <p>
          Stop guessing. Let AI analyze your idea before you invest your time
          and money.
        </p>

        <button onClick={handleClick}>
          Get Started Free
        </button>
      </motion.div>
    </section>
  );
}

export default CTA;