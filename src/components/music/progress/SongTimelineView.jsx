import { useState, useRef } from "react";

import VideoCard from "./VideoCard";
import EditVideoModal from "./EditVideoModal";

import "../../../styles/music/progress/SongTimelineView.css";
import "../../../styles/music/progress/FolderViewer.css";

function SongTimelineView({ songName, videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editingVideo, setEditingVideo] = useState(null);
  const [localVideos, setLocalVideos] = useState(videos);

  const videoRef = useRef(null);

  const groupedByMonth = {};

  localVideos.forEach((video) => {
    const date = new Date(video.date);

    const month = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    const day = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    if (!groupedByMonth[month]) {
      groupedByMonth[month] = {};
    }

    if (!groupedByMonth[month][day]) {
      groupedByMonth[month][day] = [];
    }

    groupedByMonth[month][day].push(video);
  });

  const currentMonth = Object.keys(groupedByMonth)[0];

  const [openMonths, setOpenMonths] = useState({
    [currentMonth]: true,
  });

  function toggleMonth(month) {
    setOpenMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  }

  return (
    <>
      <div className="song-timeline-page">
        <div className="timeline-wrapper">
          {Object.entries(groupedByMonth).map(([month, monthDays]) => {
            const isOpen = openMonths[month];

            return (
              <div className="month-group" key={month}>
                <button
                  className="month-header"
                  onClick={() => toggleMonth(month)}
                >
                  <h2>{month}</h2>
                </button>

                <div className={`month-content ${isOpen ? "open" : ""}`}>
                  <div className="videos-grid">
                    {Object.entries(monthDays).flatMap(([day, dayVideos]) =>
                      dayVideos.map((video, index) => (
                        <div className="video-with-day" key={video.id}>
                          {index === 0 && (
                            <div className="floating-day-label">{day}</div>
                          )}

                          <VideoCard
                            video={video}
                            onOpenVideo={setSelectedVideo}
                            onEditVideo={setEditingVideo}
                          />
                        </div>
                      )),
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedVideo && (
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
              ref={videoRef}
              src={selectedVideo.videoUrl}
              controls
              autoPlay
              playsInline
              className={selectedVideo.orientation}
            />
          </div>
        </div>
      )}

      {editingVideo && (
        <EditVideoModal
          video={editingVideo}
          onClose={() => setEditingVideo(null)}
          onSave={(updatedVideo, action) => {
            if (action === "delete") {
              setLocalVideos((prev) =>
                prev.filter((v) => v.id !== updatedVideo.id),
              );
              setEditingVideo(null);
              return;
            }

            setLocalVideos((prev) =>
              prev.map((v) => (v.id === updatedVideo.id ? updatedVideo : v)),
            );

            setEditingVideo(null);
          }}
        />
      )}
    </>
  );
}

export default SongTimelineView;
