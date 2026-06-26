import { useRef, useState, useEffect } from "react";
import "../../../styles/music/creations/CreationPlayerModal.css";

function CreationPlayerModal({ item, onClose }) {
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const isSong = item.type === "songs";

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || item.type === "lyrics") return;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(console.log);

    function onPlay() {
      setPlaying(true);
    }

    function onPause() {
      setPlaying(false);
    }

    function onEnded() {
      setPlaying(false);
    }

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [item.type]);

  useEffect(() => {
    function handleKeys(e) {
      const audio = audioRef.current;
      if (!audio || item.type === "lyrics") return;

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
        return;
      }

      if (e.code === "ArrowLeft") {
        e.preventDefault();
        audio.currentTime = Math.max(0, audio.currentTime - 3);
        return;
      }

      if (e.code === "ArrowRight") {
        e.preventDefault();
        audio.currentTime = Math.min(
          audio.duration || 0,
          audio.currentTime + 3
        );
      }
    }

    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, [item.type]);

  if (item.type === "lyrics") {
    return (
      <div
        className="song-player-overlay"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="song-player-modal">
          <button onClick={onClose}>✕</button>

          <h2>{item.title}</h2>

          <pre className="lyrics-text">{item.description}</pre>
        </div>
      </div>
    );
  }

  return (
    <div
      className="song-player-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="song-player-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>

        {isSong ? (
          <div className="cover-area">
            <img src={item.coverImage} alt="" />

            {playing && (
              <div className="cover-bars">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
            )}

            <button className="big-play-btn" onClick={togglePlay}>
              {playing ? "❚❚" : "▶"}
            </button>
          </div>
        ) : (
          <div className="visualizer-box">
            <div className="sound-bars">
              {Array.from({ length: 32 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    animationDuration: `${0.7 + (i % 5) * 0.25}s`,
                  }}
                />
              ))}
            </div>

            <button className="center-play-btn" onClick={togglePlay}>
              {playing ? "❚❚" : "▶"}
            </button>
          </div>
        )}

        <audio
          ref={audioRef}
          src={item.audioFile}
          controls
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default CreationPlayerModal;