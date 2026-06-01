import "../../styles/movie/hero.css";
function Hero() {
  return (
    <section className="fj-hero">
      <img
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1800&auto=format&fit=crop"
        alt=""
      />

      <div className="fj-hero-overlay"></div>

      <div className="fj-hero-content">
        <div className="fj-hero-left">
          <h1>FILM JOURNAL</h1>

          <p className="fj-subtitle">
            frames, ideas, unfinished worlds.
          </p>

          <p className="fj-status">in progress</p>
        </div>

        <div className="fj-hero-right">
          <div className="fj-quote">
            <span>everything</span>
            <span>i see</span>
            <span>becomes</span>
            <span>a shot.</span>
          </div>

          <div className="fj-project">
            <span className="fj-small">CURRENT PROJECT</span>

            <h2>UNTITLED_07</h2>

            <div className="fj-progress">
              <div className="fj-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;