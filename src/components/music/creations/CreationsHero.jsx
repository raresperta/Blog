import "../../../styles/music/creations/CreationsHero.css";
import "../../../styles/music/creations/CreationsTabs.css";
function CreationsHero({ items }) {
  return (
    <>
      <div className="creations-hero">
        <div>
          <span className="creations-tag">
            MY CREATIVE SPACE
          </span>

          <h1>My Creations</h1>

          <p>
            Songs, samples, riffs, drum ideas and lyrics gathered in one place.
          </p>
        </div>

        <button className="upload-btn">
          + Upload
        </button>
      </div>

      <div className="creation-stats">
        <div className="stat-card">
          <h3>{items.length}</h3>
          <span>Songs</span>
        </div>
      </div>
    </>
  );
}

export default CreationsHero;