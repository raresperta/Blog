import "../../../styles/music/learning/learningDetails.css";
import ResourcesSection from "./ResourcesSection";

function LearningDetails({ song, onSongUpdate }) {
  if (!song) return null;

  return (
    <div className="learning-details">
      <div className="details-header">
        <img src={song.coverImage} alt="" />

        <div className="details-meta">
          <h2>{song.title}</h2>
          <p>{song.artist}</p>
        </div>
      </div>

      <ResourcesSection
        song={song}
        onSongUpdate={onSongUpdate}
      />
    </div>
  );
}

export default LearningDetails;