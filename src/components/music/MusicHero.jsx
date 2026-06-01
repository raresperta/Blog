function MusicHero() {
  return (
    <section className="music-hero">
      <div className="music-hero-left">
        <span className="music-tag">MY MUSIC SPACE</span>

        <h1>
          My Music <br />
          Journey
        </h1>

        <p>
          Creez, învăț și evoluez în fiecare zi. Bine ai venit în călătoria mea
          muzicală.
        </p>

        <div className="music-buttons">
          <button className="music-primary-btn">
            🎧 Ascultă creațiile mele
          </button>

          <button className="music-secondary-btn">Vezi progresul</button>
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
