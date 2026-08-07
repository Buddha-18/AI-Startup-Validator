import { useState } from "react";
import "./FAQ.css";

const faqData = [
  {
    q: "How does the AI validate ideas?",
    a: "It analyzes market demand, competitors, uniqueness and potential risks."
  },
  {
    q: "How long does it take?",
    a: "Usually less than 30 seconds."
  },
  {
    q: "Can I export the report?",
    a: "Yes. PDF export will be available in the Pro version."
  }
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>

      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <button
            className="faq-question"
            onClick={() => setOpen(open === index ? null : index)}
          >
            {item.q}
            <span>{open === index ? "-" : "+"}</span>
          </button>

          {open === index && (
            <div className="faq-answer">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default FAQ;