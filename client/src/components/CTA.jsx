import "./CTA.css";
import { motion } from "framer-motion";

function CTA() {
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
          Stop guessing. Let AI analyze your idea before you invest your time and money.
        </p>

        <button>Get Started Free</button>
      </motion.div>
    </section>
  );
}

export default CTA;