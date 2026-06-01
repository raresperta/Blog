import VideoCard from "./VideoCard";

import "../../../styles/music/progress/VideoMonthGroup.css";

function VideoMonthGroup({
  title,
  videos,
  onOpenVideo,
}) {
  return (
    <div className="month-group">
      <h2>{title}</h2>

      <div className="timeline-grid">
        {videos.map((video) => (
          <VideoCard
            key={video._id || video.videoUrl}
            video={video}
            onOpenVideo={onOpenVideo}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoMonthGroup;