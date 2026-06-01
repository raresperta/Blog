import "../../styles/movie/ideaVault.css";
function IdeaVault() {
  return (
    <div className="fj-card fj-idea-vault">
      <div className="fj-section-title">
        <h3>IDEA VAULT</h3>
        <span>scenes, dialogue, shots</span>
      </div>

      <div className="fj-ideas">
        <div className="fj-idea-box">
          <span>scene idea</span>

          <p>
            INT. KITCHEN - 3AM
            <br />
            <br />
            blue light only.
            <br />
            fridge open.
            <br />
            no music.
            <br />
            just breathing.
          </p>
        </div>

        <div className="fj-idea-box">
          <span>shot idea</span>

          <p>
            slow dolly in
            <br />
            rain on window
            <br />
            reflections
            <br />
            soft focus
          </p>
        </div>
      </div>
    </div>
  );
}

export default IdeaVault;