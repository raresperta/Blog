function MusicNavbar() {
  return (
    <nav className="music-navbar">

      <div className="music-logo">
        🎸 My Music Journey
      </div>

      <div className="music-nav-links">
        <a href="/">Home</a>
        <a href="/music">Music</a>
        <a href="/music/creations">Creations</a>
        <a href="/music/videos">Progress</a>
        <a href="/music/learning">Learning</a>
      </div>

    </nav>
  );
}

export default MusicNavbar;