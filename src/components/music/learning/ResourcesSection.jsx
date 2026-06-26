import ResourceCard from "./ResourceCard";
import "../../../styles/music/learning/resourcesSection.css";

function ResourcesSection({
  song,
  onSongUpdate
}) {
  return (
    <div className="resources-section">
      <div className="resources-grid">
        <ResourceCard
          title="VIDEO (YouTube)"
          type="tutorial"
          value={song.lessonVideoUrl}
          song={song}
          onSongUpdate={onSongUpdate}
        />

        <ResourceCard
          title="TAB / PDF"
          type="pdf"
          value={song.tabPdf}
          song={song}
          onSongUpdate={onSongUpdate}
        />

        <ResourceCard
          title="BACKING TRACK"
          type="backing"
          value={song.backingTrackUrl}
          song={song}
          onSongUpdate={onSongUpdate}
        />
      </div>
    </div>
  );
}

export default ResourcesSection;