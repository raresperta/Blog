import "../../styles/movie/projects.css";
function Projects() {
  return (
    <div className="fj-card fj-projects">
      <div className="fj-section-title">
        <h3>PROJECTS</h3>
        <span>your film journey</span>
      </div>

      <div className="fj-project-grid">
        <div className="fj-project-card">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop" />

          <div className="fj-project-info">
            <p>untitled_07</p>
            <span>concept</span>
          </div>
        </div>

        <div className="fj-project-card">
          <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=900&auto=format&fit=crop" />

          <div className="fj-project-info">
            <p>blurred days</p>
            <span>editing</span>
          </div>
        </div>

        <div className="fj-project-card">
          <img src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=900&auto=format&fit=crop" />

          <div className="fj-project-info">
            <p>come back home</p>
            <span>released</span>
          </div>
        </div>

        <div className="fj-new-project">
          +
          <span>new project</span>
        </div>
      </div>
    </div>
  );
}

export default Projects;