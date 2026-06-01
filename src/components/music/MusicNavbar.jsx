function MusicNavbar() {
  return (
    <nav className="music-navbar">

      <div className="music-logo">
        🎸 My Music Journey
      </div>

      <div className="music-nav-links">
        <a href="/">Home</a>
        <a className="active-link">Music</a>
        <a>Blog</a>
        <a>About</a>
        <a>Contact</a>
      </div>

    </nav>
  );
}

export default MusicNavbar;