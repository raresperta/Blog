import { useEffect, useState } from "react";

import VideoCard from "./VideoCard";

import "../../../styles/music/progress/FolderViewer.css";

function FolderViewer({
  folder,
  onClose,
  onOpenVideo
}) {
  const [
    selectedVideo,
    setSelectedVideo,
  ] = useState(null);

  /* -------------------- */
  /* BACK GESTURE SUPPORT */
  /* -------------------- */

  useEffect(() => {

    window.history.pushState(
      { folderOpen: true },
      ""
    );

    const handlePopState = () => {

      onClose();

    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);

  /* -------------------- */

  return (
    <div className="folder-viewer-overlay">

      <div className="folder-viewer">

        {/* HEADER */}

        <div className="folder-viewer-header">

          <div>

            <h1>
              {folder.songName}
            </h1>

            <p>
              {folder.sessions.length}
              {" "}
              sessions
            </p>

          </div>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        {/* GRID */}

        <div className="folder-sessions-grid">

          {folder.sessions.map(
            (video) => (
                <VideoCard
                    key={video._id || video.videoUrl}
                    video={video}
                    onOpenVideo={setSelectedVideo}
                  /> 
            )
          )}

        </div>

      </div>

      {/* PLAYER MODAL */}

      {selectedVideo && (

        <div
          className="video-modal-overlay"
          onClick={() =>
            setSelectedVideo(null)
          }
        >

          <div
            className="video-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="close-video-btn"
              onClick={() =>
                setSelectedVideo(null)
              }
            >
              ✕
            </button>

            <video
              src={
                selectedVideo.videoUrl
              }
              controls
              autoPlay
              className={
                selectedVideo.orientation
              }
            />

          </div>

        </div>

      )}

    </div>
  );
}

export default FolderViewer;