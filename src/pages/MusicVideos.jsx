import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import VideoTimeline from "../components/music/progress/VideoTimeline";
import SongsView from "../components/music/progress/SongsView";
import SongTimelineView from "../components/music/progress/SongTimelineView";

import AddVideoModal from "../components/music/progress/AddVideoModal";
import FolderViewer from "../components/music/progress/FolderViewer";
import MusicHero from "../components/music/progress/MusicHero";
import MusicNavbar from "../components/music/MusicNavbar";
import "../styles/musicVideos.css";

import {API_URL} from "../config";

function MusicVideos() {
  const [viewMode, setViewMode] = useState("songs");

  const [showModal, setShowModal] = useState(false);

  const [videos, setVideos] = useState([]);

  const [songs, setSongs] = useState([]);

  const [openedFolder, setOpenedFolder] = useState(null);

  const [selectedSong, setSelectedSong] = useState(null);

  const [activeVideo, setActiveVideo] = useState(null);

  const navigate = useNavigate();

  const fullscreenVideoRef = useRef(null);

  useEffect(() => {
    const handlePopState = () => {
      /* SONG VIDEO */

      if (activeVideo) {
        setActiveVideo(null);

        return;
      }

      /* SONG TIMELINE */

      if (selectedSong) {
        setSelectedSong(null);

        return;
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [activeVideo, selectedSong]);
  useEffect(() => {
    function handleVideoKeys(e) {
      if (!activeVideo) return;

      const video = fullscreenVideoRef.current;

      if (!video) return;

      console.log("KEY:", e.key);

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
  }, [activeVideo]);
  /* -------------------- */
  /* FETCH */
  /* -------------------- */

  async function fetchVideos() {
    try {
      const res = await axios.get(`${API_URL}/sessions`);

      const sorted = [...res.data].sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setVideos(sorted);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSongs() {
    try {
      const res = await axios.get(`${API_URL}/songs`);
      setSongs(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchVideos();
    fetchSongs();
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
  }
  return (
    <div className="music-videos-page">
      {/* TOPBAR */}
      <MusicNavbar/>

      <div className="videos-topbar">
        

        <button className="new-session-btn" onClick={() => setShowModal(true)}>
          + New Session
        </button>
      </div>

      {/*<MusicHero videos={videos} />*/}

      {/* CONTENT */}

      {viewMode === "timeline" && (
        <VideoTimeline
          videos={videos}
          songs={songs}
          onOpenFolder={(folder) => {
            setOpenedFolder(folder);

            window.history.pushState(
              { folder: folder.songName },

              "",

              `#folder-${folder.songName}`,
            );
          }}
        />
      )}

      {viewMode === "songs" && !selectedSong && (
        <SongsView videos={videos} songs={songs} onSelectSong={openSong} />
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
          onUpdateFolder={(updatedSessions) => {
            /* CURRENT SONG */

            const currentSong = openedFolder.songName;

            /* UPDATE FOLDER */

            setOpenedFolder((prev) => ({
              ...prev,

              sessions: updatedSessions,
            }));

            /* UPDATE GLOBAL VIDEOS */

            setVideos((prevVideos) => {
              const updated = prevVideos.map((video) => {
                const editedVideo = updatedSessions.find(
                  (v) => v.id === video.id,
                );

                return editedVideo || video;
              });

              return updated.sort(
                (a, b) => new Date(b.date) - new Date(a.date),
              );
            });
            fetchSongs();
          }}
        />
      )}
      {activeVideo && (
        <div className="fullscreen-video-viewer" onClick={closeVideoViewer}>
          <video
            ref={fullscreenVideoRef}
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
