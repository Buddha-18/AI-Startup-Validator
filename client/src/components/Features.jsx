import "./Features.css";
import { FaRobot, FaChartLine, FaRocket } from "react-icons/fa";

function Features() {
  return (
    <section className="features">

      <h2>Why Choose AI?</h2>

      <div className="cards">

        <div className="card">
          <FaRobot size={45}/>
          <h3>AI Analysis</h3>
          <p>Deep market research within seconds.</p>
        </div>

        <div className="card">
          <FaChartLine size={45}/>
          <h3>Growth Prediction</h3>
          <p>Know your future potential.</p>
        </div>

        <div className="card">
          <FaRocket size={45}/>
          <h3>Launch Faster</h3>
          <p>Save months of research.</p>
        </div>

      </div>

    </section>
  );
}

export default Features;