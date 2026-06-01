import "../../styles/movie/frames.css";
function Frames() {
  return (
    <div className="fj-card fj-frames">
      <div className="fj-section-title">
        <h3>FRAMES</h3>
        <span>favorite stills</span>
      </div>

      <div className="fj-frame-layout">
        <img
          className="fj-main-frame"
          src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1400&auto=format&fit=crop"
        />

        <div className="fj-frame-details">
          <div className="fj-detail">
            <span>FOCAL LENGTH</span>
            <p>35mm</p>
          </div>

          <div className="fj-detail">
            <span>MOOD</span>
            <p>golden hour</p>
          </div>

          <div className="fj-detail">
            <span>NOTE</span>
            <p>silence before confrontation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frames;