function LearningSongCard({ song, active, onClick }) {
  return (
    <div
      className={`learning-song-card ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={song.coverImage} alt="" />

      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
    </div>
  );
}

export default LearningSongCard;