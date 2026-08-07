import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="left">

        <h1>
          Validate Your Startup Idea
          <span> Using AI</span>
        </h1>

        <p>
          Stop wasting months building products nobody wants.
          Get instant AI-powered validation.
        </p>

        <button>
          Start Free
        </button>

      </div>

      <div className="right">

        <img
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900"
          alt="AI"
        />

      </div>

    </section>
  );
}

export default Hero;