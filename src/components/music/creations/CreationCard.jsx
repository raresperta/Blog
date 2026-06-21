import "../../../styles/music/creations/CreationCard.css";

function CreationCard({ item, onClick, showCover = true, onRightClick }) {
  return (
    <div className="song-card" onClick={onClick} onContextMenu = {(e) => {e.preventDefault(); onRightClick(e, item)}}>
      {showCover && (
        <div className="song-cover-wrapper">
          <img
            className="song-cover"
            src={item.coverImage}
            alt={item.title}
          />

          <div className="song-play-overlay">▶</div>
        </div>
      )}

      {!showCover && (
        <div className="creation-icon">
          🎵
        </div>
      )}

      <h3>{item.title}</h3>

      <div className="song-meta">
        {item.key && <span>{item.key}</span>}
        {item.bpm && <span>{item.bpm} BPM</span>}
      </div>

      <div className={`song-status ${item.status}`}>
        {item.status}
      </div>
    </div>
  );
}

export default CreationCard;