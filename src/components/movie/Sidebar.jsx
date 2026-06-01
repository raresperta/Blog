import "../../styles/movie/sidebar.css";
function Sidebar() {
  return (
    <aside className="fj-sidebar">
      <div>
        <div className="fj-logo">
          <span>L.C /</span>
          <span>FILM</span>
        </div>

        <nav className="fj-menu">
          <a className="fj-active">OVERVIEW</a>
          <a>VISUAL BOARD</a>
          <a>SNEAK PEEKS</a>
          <a>FRAMES</a>
          <a>IDEAS</a>
          <a>SOUNDTRACK</a>
          <a>PROJECTS</a>
        </nav>
      </div>

      <div className="fj-sidebar-footer">
        
      </div>
    </aside>
  );
}

export default Sidebar;