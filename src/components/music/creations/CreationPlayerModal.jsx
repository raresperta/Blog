import { useRef, useState, useEffect } from "react";
import "../../../styles/music/creations/CreationPlayerModal.css";

function CreationPlayerModal({ item, onClose, showCover = true }) {
  const audioRef = useRef(null);
  const animationRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [bars, setBars] = useState(new Array(16).fill(20));

  /* -------------------- */
  /* FAKE VISUALIZER */
  /* -------------------- */

  function startBarsAnimation() {
    function update() {
      setBars(
        Array.from({ length: 16 }, (_, i) => {
          const centerBoost = 1 - Math.abs(i - 7.5) / 8;

          const min = 20;
          const max = 40 + centerBoost * 80;

          return min + Math.random() * max;
        }),
      );

      animationRef.current = requestAnimationFrame(update);
    }

    update();
  }

  function stopBarsAnimation() {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;

    setBars(new Array(16).fill(20));
  }

  /* -------------------- */
  /* PLAY */
  /* -------------------- */

  async function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  }

  /* -------------------- */
  /* AUDIO EVENTS */
  /* -------------------- */

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;
    audio
      .play()

      .then(() => {
        setPlaying(true);

        startBarsAnimation();
      })

      .catch(console.log);

    function onPlay() {
      setPlaying(true);

      if (!animationRef.current) {
        startBarsAnimation();
      }
    }

    function onPause() {
      setPlaying(false);
      stopBarsAnimation();
    }

    function onEnded() {
      setPlaying(false);
      stopBarsAnimation();
    }

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  /* -------------------- */
  /* CLEANUP */
  /* -------------------- */

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  useEffect(() => {
    function handleKeys(e) {
      const audio = audioRef.current;

      if (!audio) return;

      /* SPACE */

      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
        return;
      }

      /* LEFT */

      if (e.code === "ArrowLeft") {
        e.preventDefault();

        audio.currentTime = Math.max(0, audio.currentTime - 3);

        return;
      }

      /* RIGHT */

      if (e.code === "ArrowRight") {
        e.preventDefault();

        audio.currentTime = Math.min(
          audio.duration || 0,
          audio.currentTime + 3,
        );
      }
    }

    window.addEventListener("keydown", handleKeys);

    return () => {
      window.removeEventListener("keydown", handleKeys);
    };
  }, []);

  /* -------------------- */

  return (
    <div
      className="song-player-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="song-player-modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✕</button>

        <div className="cover-area">
          {showCover ? (
            <img src={item.coverImage} alt="" />
          ) : (
            <div className="no-cover-visual">🎧</div>
          )}

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
