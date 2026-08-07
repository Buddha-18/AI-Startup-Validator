import "./Testimonials.css";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aarav Sharma",
    role: "Founder",
    text: "This AI saved us months of market research."
  },
  {
    name: "Priya Das",
    role: "Developer",
    text: "Clean UI and incredibly useful insights."
  },
  {
    name: "Rahul Singh",
    role: "Student",
    text: "Perfect for validating hackathon and startup ideas."
  }
];

function Testimonials() {
  return (
    <section className="testimonials">
      <h2>What People Say</h2>

      <div className="review-grid">
        {reviews.map((item, index) => (
          <motion.div
            className="review-card"
            key={index}
            whileHover={{ y: -10, scale: 1.03 }}
          >
            <div className="stars">★★★★★</div>
            <p>"{item.text}"</p>

            <div className="user">
              <h4>{item.name}</h4>
              <span>{item.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;