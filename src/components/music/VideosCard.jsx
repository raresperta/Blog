import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";

function VideosCard({ videos }) {
  const navigate = useNavigate();

  return (
    <div className="music-card">
      <div className="card-header">
        <h3>🎬 Progresul meu</h3>

        <span onClick={() => navigate("/music/videos")}>Vezi toate</span>
      </div>

      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video.id}>
            <img src={video.image} alt="" />

            <p>{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideosCard;
