import { useNavigate } from "react-router-dom";

function MusicHero() {
  const navigate = useNavigate();
  return (
    <section className="music-hero-main">
      <div className="music-hero-left">
        <span className="music-tag">MY MUSIC SPACE</span>

        <h1>
          My Music 
          Journey
        </h1>

        <span className="music-subtitle">Create • Practice • Improve</span>

        <div className="music-buttons">
          <button
            className="music-primary-btn"
            onClick={() => navigate("/music/creations")}
          >
            🎧 Ascultă creațiile mele
          </button>

          <button
            className="music-secondary-btn"
            onClick={() => navigate("/music/videos")}
          >
            Vezi progresul
          </button>
        </div>
      </div>

      <div className="music-hero-right">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
          alt=""
        />
      </div>
    </section>
  );
}

export default MusicHero;
