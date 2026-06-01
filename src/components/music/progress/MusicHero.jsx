import "../../../styles/music/progress/MusicHero.css";

function MusicHero({ videos }) {
  const totalSongs = [...new Set(videos.map((v) => v.song))].length;

  return (
    <div className="music-hero">
      <div className="hero-left">
        <span className="hero-label">Welcome back!</span>

        <h2>
          Your musical journey
          <br />
          starts here.
        </h2>

        <p>Capture, organize and relive your guitar moments.</p>
      </div>

      <div className="hero-stats">
        <div className="hero-stat-card">
          <div className="stat-icon">🎵</div>

          <div>
            <h3>{videos.length}</h3>

            <span>Total Sessions</span>
          </div>
        </div>

        <div className="hero-stat-card">
          <div className="stat-icon">📁</div>

          <div>
            <h3>{totalSongs}</h3>

            <span>Total Songs</span>
          </div>
        </div>
      </div>
      <div className="hero-waves wave-layer-1">
        <img src="/waves.svg" alt="" />
      </div>

      <div className="hero-waves wave-layer-2">
        <img src="/waves.svg" alt="" />
      </div>
      <div className="hero-waves wave-layer-3">
        <img src="/waves.svg" alt="" />
      </div>
    </div>
  );
}

export default MusicHero;
