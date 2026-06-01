import { useEffect, useState } from "react";

import axios from "axios";

import VideoTimeline from "../components/music/progress/VideoTimeline";
import SongsView from "../components/music/progress/SongsView";
import SongTimelineView from "../components/music/progress/SongTimelineView";

import AddVideoModal from "../components/music/progress/AddVideoModal";
import FolderViewer from "../components/music/progress/FolderViewer";
import MusicHero from "../components/music/progress/MusicHero";

import "../styles/music/progress/VideosTopbar.css";
import "../styles/musicVideos.css";

function MusicVideos() {
  const [viewMode, setViewMode] = useState("timeline");

  const [showModal, setShowModal] = useState(false);

  const [videos, setVideos] = useState([]);

  const [openedFolder, setOpenedFolder] = useState(null);

  const [selectedSong, setSelectedSong] = useState(null);

  const [activeVideo, setActiveVideo] = useState(null);
  /* -------------------- */
  /* FETCH */
  /* -------------------- */

  async function fetchVideos() {
    try {
      const res = await axios.get("http://localhost:5001/sessions");

      const sorted = [...res.data].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setVideos(sorted);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setSelectedSong(null);

      setActiveVideo(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  /* -------------------- */
  /* OPEN SONG */
  /* -------------------- */

  function openSong(songName) {
    setSelectedSong(songName);

    window.history.pushState({ song: songName }, "", `#${songName}`);
  }

  /* -------------------- */
  /* TOPBAR ACTIONS */
  /* -------------------- */

  function handleTimelineClick() {
    setViewMode("timeline");

    setSelectedSong(null);
  }

  function handleSongsClick() {
    setViewMode("songs");

    setSelectedSong(null);
  }

  /* -------------------- */
  function closeVideoViewer() {
    setActiveVideo(null);

    window.history.back();
  }
  return (
    <div className="music-videos-page">
      {/* TOPBAR */}

      <div className="videos-topbar">
        <div className="videos-header-left">
          <h1>🎬 Guitar Sessions</h1>

          <div className="view-switcher">
            <button
              className={viewMode === "timeline" ? "active-view" : ""}
              onClick={handleTimelineClick}
            >
              Timeline
            </button>

            <button
              className={viewMode === "songs" ? "active-view" : ""}
              onClick={handleSongsClick}
            >
              Songs
            </button>
          </div>
        </div>

        <button className="new-session-btn" onClick={() => setShowModal(true)}>
          + New Session
        </button>
      </div>

      <MusicHero videos={videos} />

      {/* CONTENT */}

      {viewMode === "timeline" && (
        <VideoTimeline videos={videos} onOpenFolder={setOpenedFolder}/>
      )}

      {viewMode === "songs" && !selectedSong && (
        <SongsView videos={videos} onSelectSong={openSong} />
      )}

      {viewMode === "songs" && selectedSong && (
        <SongTimelineView
          songName={selectedSong}
          videos={videos.filter((v) => v.song === selectedSong)}
          onOpenVideo={(video) => {
            setActiveVideo(video);

            window.history.pushState(
              { video: video._id },
              "",
              `#video-${video._id}`,
            );
          }}
        />
      )}

      {/* MODAL */}

      {showModal && (
        <AddVideoModal
          onClose={() => setShowModal(false)}
          onUploadSuccess={() => {
            fetchVideos();
          }}
        />
      )}

      {/* VIEWER */}

      {openedFolder && (
        <FolderViewer
          folder={openedFolder}
          onClose={() => setOpenedFolder(null)}
        />
      )}
      {activeVideo && (
        <div className="fullscreen-video-viewer" onClick={closeVideoViewer}>

          <video
            src={activeVideo.videoUrl}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default MusicVideos;
