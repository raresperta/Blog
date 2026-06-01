import "../../styles/movie/sneakPeeks.css";
function SneakPeeks() {
  return (
    <div className="fj-card fj-sneak-peeks">
      <div className="fj-section-title">
        <h3>SNEAK PEEKS</h3>
        <span>raw, uncut, imperfect</span>
      </div>

      <div className="fj-peek-grid">
        <div className="fj-peek">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop" />

          <div className="fj-peek-info">
            <p>untitled_07.mov</p>
            <span>02:14</span>
          </div>
        </div>

        <div className="fj-peek">
          <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=900&auto=format&fit=crop" />

          <div className="fj-peek-info">
            <p>days like these.mp4</p>
            <span>01:03</span>
          </div>
        </div>

        <div className="fj-peek">
          <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop" />

          <div className="fj-peek-info">
            <p>hotel room scene.mov</p>
            <span>00:47</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SneakPeeks;