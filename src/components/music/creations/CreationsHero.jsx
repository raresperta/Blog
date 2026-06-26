import { useNavigate } from "react-router-dom";
import "../../../styles/music/creations/CreationsHero.css";

function CreationsHero({ items = [] }) {
  const navigate = useNavigate();

  const icons = {
    songs: "🎵",
    samples: "🎛️",
    riffs: "🎸",
    drums: "🥁",
    lyrics: "📝",
  };

  const types = ["songs", "samples", "riffs", "drums", "lyrics"];

  return (
    <div className="creations-hero">
      <div className="hero-left">
        <button
          className="back-to-music-btn"
          onClick={() => navigate("/music")}
        >
          ← Back to Music
        </button>

        <h1>My Creations</h1>

        <p>
          Songs, samples, riffs, drum ideas and lyrics gathered in one place.
        </p>
      </div>

      <div className="hero-stats">
        {types.map((type) => {
          const count = items.filter(
            (item) => item.type === type
          ).length;

          return (
            <div className="hero-stat-pill" key={type}>
              <div className="stat-top">
                <span className="stat-icon-creations">
                  {icons[type]}
                </span>

                <span className="stat-number">
                  {count}
                </span>
              </div>

              <span className="stat-label">
                {type.charAt(0).toUpperCase() +
                  type.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreationsHero;