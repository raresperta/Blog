import "../../../styles/music/progress/VideoCard.css";

function VideoCard({ video, onOpenVideo }) {
  return (
    <div
      className={`
        timeline-card
        ${video.orientation}
      `}
      onClick={() => onOpenVideo(video)}
    >
      <img src={video.thumbnail} alt="" />

      <div className="timeline-overlay">
        <div className="video-info">
          <span className="video-date">
            {new Date(video.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>

          <p>
            {video.description?.trim() ? video.description : "No description"}
          </p>
        </div>

        <div className="play-icon">▶</div>
      </div>
    </div>
  );
}

export default VideoCard;
