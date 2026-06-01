import "../../styles/movie/visualBoard.css";
function VisualBoard() {
  return (
    <div className="fj-card fj-visual-board">
      <div className="fj-section-title">
        <h3>VISUAL BOARD</h3>
        <span>mood, references, textures</span>
      </div>

      <div className="fj-visual-grid">
        <img
          className="fj-tall"
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop"
        />

        <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=900&auto=format&fit=crop" />

        <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=900&auto=format&fit=crop" />

        <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=900&auto=format&fit=crop" />

        <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop" />

        <div className="fj-note">
          golden hour
          <br />
          melancholy.
          <br />
          nostalgia
          <br />
          silence
        </div>
      </div>
    </div>
  );
}

export default VisualBoard;