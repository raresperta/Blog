import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import "../../styles/music/VideosCard.css";
import { createPortal } from "react-dom";

function VideosCard({ videos }) {
  const navigate = useNavigate();

  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <div className="music-card">
      <div className="card-header">
        <h3>🎬 Progresul meu</h3>

        <span onClick={() => navigate("/music/videos")}>Vezi toate</span>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card latest-video-card" key={video.id}>
            <img src={video.thumbnail} alt="" />

            <div
              className="video-card-overlay"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="video-card-play">▶</div>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo &&
        createPortal(
          <div
            className="video-modal-overlay"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-video-btn"
                onClick={() => setSelectedVideo(null)}
              >
                ✕
              </button>

              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                playsInline
              />
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default VideosCard;
