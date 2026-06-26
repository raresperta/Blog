import "../../../styles/music/creations/CreationCard.css";

function CreationCard({ item, onClick, showCover = true, onRightClick }) {
  const isLyrics = item.type === "lyrics";
  const icons = {
    samples: "🎛️",
    riffs: "🎸",
    drums: "🥁",
    lyrics: "📝",
  };
  return (
    <div
      className="song-card"
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(e, item);
      }}
    >
      {showCover && (
        <div className="song-cover-wrapper">
          <img className="song-cover" src={item.coverImage} alt={item.title} />

          <div className="song-play-overlay">▶</div>
        </div>
      )}

      {!showCover && (
        <div className="creation-icon">{icons[item.type] || "🎵"}</div>
      )}

      <h3>{item.title}</h3>

      {!isLyrics && (
        <div className="song-meta">
          {item.key && (
            <span>
              <span className="meta-icon">🎼</span>
              {item.key}
            </span>
          )}
          {item.bpm && (
            <span>
              <span className="meta-icon">⏱</span>
              {item.bpm} BPM
            </span>
          )}
        </div>
      )}
      {isLyrics && (
        <p className="lyrics-preview">{item.description?.slice(0, 90)}...</p>
      )}

      <div className={`song-status ${item.status}`}>{item.status}</div>
    </div>
  );
}

export default CreationCard;
