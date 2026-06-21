import { useRef, useState, useEffect } from "react";

import axios from "axios";

import "../../../styles/music/progress/EditVideoModal.css";

function EditVideoModal({ video, onClose, onSave }) {
  const videoRef = useRef(null);

  const [description, setDescription] = useState(video.description || "");

  const [isBestTake, setIsBestTake] = useState(video.isBestTake || false);

  const [loading, setLoading] = useState(false);

  /* -------------------- */
  /* TRIM */
  /* -------------------- */

  const [duration, setDuration] = useState(0);

  const [trimStart, setTrimStart] = useState(0);

  const [trimEnd, setTrimEnd] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);

  const timelineRef = useRef(null);

  const [dragging, setDragging] = useState(null);

  /* -------------------- */
  /* VIDEO LOADED */
  /* -------------------- */

  function handleLoadedMetadata() {
    const videoDuration = videoRef.current.duration;

    setDuration(videoDuration);

    setTrimEnd(videoDuration);
    videoRef.current.play();
    setIsPlaying(true);
  }

  /* -------------------- */
  /* VIDEO TIME UPDATE */
  /* -------------------- */

  function handleTimeUpdate() {
    const current = videoRef.current.currentTime;

    setCurrentTime(current);

    /* LOOP INSIDE RANGE */

    if (current >= trimEnd) {
      videoRef.current.currentTime = trimStart;
    }
  }

  /* -------------------- */
  /* PLAY */
  /* -------------------- */

  function togglePlay() {
    if (!videoRef.current) return;

    /* RESET TO START */

    if (currentTime < trimStart || currentTime > trimEnd) {
      videoRef.current.currentTime = trimStart;
    }

    if (isPlaying) {
      videoRef.current.pause();

      setIsPlaying(false);
    } else {
      videoRef.current.play();

      setIsPlaying(true);
    }
  }

  function handleTimelineClick(e) {
    if (!timelineRef.current || !duration) return;

    const rect = timelineRef.current.getBoundingClientRect();

    const clickX = e.clientX - rect.left;

    const percent = clickX / rect.width;

    const newTime = percent * duration;

    videoRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  }

  function getTimeFromMouse(clientX) {
    if (!timelineRef.current || !duration) return 0;

    const rect = timelineRef.current.getBoundingClientRect();

    const percent = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width),
    );

    return percent * duration;
  }

  function startDragging(type) {
    setDragging(type);
  }

  useEffect(() => {
    function handleMove(e) {
      if (!dragging) return;

      const newTime = getTimeFromMouse(e.clientX);

      if (dragging === "start") {
        if (newTime >= trimEnd) return;

        setTrimStart(newTime);

        setCurrentTime(newTime);

        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }
      }

      if (dragging === "end") {
        if (newTime <= trimStart) return;

        setTrimEnd(newTime);

        setCurrentTime(newTime);

        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }
      }

      if (dragging === "playhead") {
        setCurrentTime(newTime);

        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }
      }
    }

    function handleUp() {
      setDragging(null);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging, duration, trimStart, trimEnd]);

  useEffect(() => {
    function handleKeyDown(e) {
      const tag = document.activeElement?.tagName;

      if (
        tag === "TEXTAREA" ||
        tag === "INPUT" ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      /* SPACE */

      if (e.code === "Space") {
        e.preventDefault();

        togglePlay();

        return;
      }

      /* LEFT */

      if (e.code === "ArrowLeft") {
        e.preventDefault();

        const newTime = Math.max(0, currentTime - 3);

        setCurrentTime(newTime);

        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }

        return;
      }

      /* RIGHT */

      if (e.code === "ArrowRight") {
        e.preventDefault();

        const newTime = Math.min(duration, currentTime + 3);

        setCurrentTime(newTime);

        if (videoRef.current) {
          videoRef.current.currentTime = newTime;
        }

        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlaying, currentTime, duration, trimStart, trimEnd]);

  /* -------------------- */
  /* SLIDER CHANGE */
  /* -------------------- */

  function handleTrimStart(value) {
    const numericValue = Number(value);

    setTrimStart(numericValue);

    videoRef.current.currentTime = numericValue;
  }

  function handleTrimEnd(value) {
    const numericValue = Number(value);

    setTrimEnd(numericValue);

    videoRef.current.currentTime = numericValue;
  }

  /* -------------------- */
  /* FORMAT TIME */
  /* -------------------- */

  function formatTime(seconds) {
    if (!seconds && seconds !== 0) return "0:00";

    const mins = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  /* -------------------- */
  /* SAVE */
  /* -------------------- */

  async function handleSave() {
    try {
      setLoading(true);

      const res = await axios.patch(
        "http://localhost:5001/sessions/videos/" + video.id,

        {
          description,
          isBestTake,

          trimStart,
          trimEnd,
        },
      );

      onSave(res.data.session, "edit");

      onClose();
    } catch (err) {
      console.log(err);

      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  /* -------------------- */
  /* DELETE */
  /* -------------------- */

  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this session?");

    if (!confirmDelete) return;

    try {
      await axios.delete("http://localhost:5001/sessions/videos/" + video.id);

      onSave(video, "delete");

      onClose();
    } catch (err) {
      console.log(err);

      alert("Delete failed");
    }
  }

  /* -------------------- */

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-video-modal large">
        <div className="modal-header">
          <h2>Edit Session</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {/* LAYOUT */}

        <div className="edit-video-layout">
          {/* LEFT */}

          <div className="edit-video-left">
            {/* VIDEO */}

            <div className="edit-video-player">
              <video
                ref={videoRef}
                src={video.videoUrl}
                playsInline
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
              />

              {/* TIMELINE OVERLAY */}

              <div className="video-timeline-overlay">
                <button className="trim-play-btn" onClick={togglePlay}>
                  {isPlaying ? "❚❚" : "▶"}
                </button>

                <div className="timeline-wrapper">
                  <div
                    className="timeline-editor"
                    ref={timelineRef}
                    onMouseDown={(e) => {
                      const newTime = getTimeFromMouse(e.clientX);

                      setCurrentTime(newTime);

                      if (videoRef.current) {
                        videoRef.current.currentTime = newTime;
                      }

                      startDragging("playhead");
                    }}
                  >
                    <div className="timeline-track" />
                    <div
                      className="timeline-handle start"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startDragging("start");
                      }}
                      style={{
                        left: `${(trimStart / duration) * 100}%`,
                      }}
                    />

                    <div
                      className="timeline-handle end"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startDragging("end");
                      }}
                      style={{
                        left: `${(trimEnd / duration) * 100}%`,
                      }}
                    />

                    <div
                      className="timeline-playhead"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        startDragging("playhead");
                      }}
                      style={{
                        left: `${(currentTime / duration) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT */}

          <div className="edit-video-right">
            {/* DESCRIPTION */}

            <textarea
              placeholder="
                Session notes...
              "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* THE ONE */}

            <div
              className={`
                best-take-mini
                ${isBestTake ? "active" : ""}
              `}
              onClick={() => setIsBestTake(!isBestTake)}
            >
              <div className="best-take-mini-left">
                <div className="best-take-dot" />

                <span>The One</span>
              </div>

              <div className="best-take-mini-switch">✦</div>
            </div>

            {/* ACTIONS */}

            <div className="edit-actions">
              <button className="delete-session-btn" onClick={handleDelete}>
                Delete Session
              </button>

              <button className="save-btn" onClick={handleSave}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditVideoModal;
