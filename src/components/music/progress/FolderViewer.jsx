import { useEffect, useState, useRef } from "react";

import VideoCard from "./VideoCard";
import EditVideoModal from "./EditVideoModal";

import "../../../styles/music/progress/FolderViewer.css";

function FolderViewer({ folder, onClose, onUpdateFolder }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const [editingVideo, setEditingVideo] = useState(null);

  const [sessions, setSessions] = useState(folder.sessions);

  const videoRef = useRef(null);

  /* -------------------- */
  /* FOLDER HISTORY */
  /* -------------------- */

  useEffect(() => {
    const handleFolderPopState = () => {
      /* VIDEO OPEN */

      if (selectedVideo) {
        setSelectedVideo(null);

        return;
      }

      /* EDIT OPEN */

      if (editingVideo) {
        setEditingVideo(null);

        return;
      }

      /* CLOSE FOLDER */

      onClose();
    };

    window.addEventListener("popstate", handleFolderPopState);

    return () => {
      window.removeEventListener("popstate", handleFolderPopState);
    };
  }, [selectedVideo, editingVideo, onClose]);

  useEffect(() => {
    function handleVideoKeys(e) {
      if (!selectedVideo) return;

      const video = videoRef.current;

      if (!video) return;

      /* SPACE */

      if (e.key === " ") {
        e.preventDefault();

        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }

        return;
      }

      /* LEFT */

      if (e.key === "ArrowLeft") {
        e.preventDefault();

        video.currentTime = Math.max(0, video.currentTime - 3);

        return;
      }

      /* RIGHT */

      if (e.key === "ArrowRight") {
        e.preventDefault();

        video.currentTime = Math.min(video.duration, video.currentTime + 3);

        return;
      }
    }

    document.addEventListener("keydown", handleVideoKeys, true);

    return () => {
      document.removeEventListener("keydown", handleVideoKeys, true);
    };
  }, [selectedVideo]);

  /* -------------------- */

  return (
    <div className="folder-viewer-overlay">
      <div className="folder-viewer">
        {/* HEADER */}

        <div className="folder-viewer-header">
          <div>
            <h1>{folder.songName}</h1>

            <p>{sessions.length} sessions</p>
          </div>

          <button onClick={onClose}>✕</button>
        </div>

        {/* GRID */}

        <div className="folder-sessions-grid">
          {sessions.map((video) => (
            <VideoCard
              key={video.id || video.videoUrl}
              video={video}
              onOpenVideo={(video) => {
                setSelectedVideo(video);

                window.history.pushState(
                  { folderVideo: true },
                  "",
                  `#folder-video`,
                );
              }}
              onEditVideo={(video) => {
                setEditingVideo(video);

                window.history.pushState(
                  { editVideo: true },
                  "",
                  `#edit-video`,
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* PLAYER */}

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

      {/* EDIT */}

      {editingVideo && (
        <EditVideoModal
          video={editingVideo}
          onClose={() => {
            setEditingVideo(null);
          }}
          onSave={(updatedVideo, action) => {
            /* DELETE */

            if (action === "delete") {
              const updatedSessions = sessions.filter(
                (session) => session.id !== updatedVideo.id,
              );

              setSessions(updatedSessions);
              onUpdateFolder(updatedSessions);

              if (updatedSessions.length === 0) {
                onClose();
              }

              return;
            }

            /* EDIT */

            const updatedSessions = sessions.map((session) => {
              if (session.id === updatedVideo.id) {
                return updatedVideo;
              }

              return session;
            });

            setSessions(updatedSessions);
            onUpdateFolder(updatedSessions);
          }}
        />
      )}
    </div>
  );
}

export default FolderViewer;
