import "./HowItWorks.css";
import { FaLightbulb, FaRobot, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaLightbulb />,
    title: "Describe Your Idea",
    desc: "Tell us about your startup in a few sentences."
  },
  {
    icon: <FaRobot />,
    title: "AI Analysis",
    desc: "Our AI analyzes market demand, competition and feasibility."
  },
  {
    icon: <FaChartLine />,
    title: "Get Insights",
    desc: "Receive a detailed validation report with actionable suggestions."
  }
];

function HowItWorks() {
  return (
    <section className="how" id="how">
      <h2>How It Works</h2>

      <div className="timeline">
        {steps.map((step, index) => (
          <motion.div
            className="step"
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;