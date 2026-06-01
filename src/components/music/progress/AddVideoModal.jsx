import { useEffect, useState } from "react";

import axios from "axios";

import "../../../styles/music/progress/AddVideoModal.css";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function AddVideoModal({ onClose, onUploadSuccess }) {
  const [songs, setSongs] = useState([]);

  const [description, setDescription] = useState("");

  const [songInput, setSongInput] = useState("");

  const [selectedSong, setSelectedSong] = useState("");

  const [video, setVideo] = useState(null);

  const [showResults, setShowResults] = useState(false);

  const [showDescription, setShowDescription] = useState(false);

  const [loading, setLoading] = useState(false);

  const [date, setDate] = useState(new Date());

  const [showManualDate, setShowManualDate] = useState(false);

  const [detectedDateLabel, setDetectedDateLabel] = useState("");

  /* -------------------- */
  /* FETCH SONGS */
  /* -------------------- */

  useEffect(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    try {
      const res = await axios.get("http://localhost:5001/songs");

      setSongs(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  /* -------------------- */
  /* FILTER SONGS */
  /* -------------------- */

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(songInput.toLowerCase()),
  );

  /* -------------------- */
  /* SELECT SONG */
  /* -------------------- */

  function handleSongSelect(song) {
    setSelectedSong(song);

    setSongInput(song);

    setShowResults(false);
  }

  /* -------------------- */
  /* ADD SONG */
  /* -------------------- */

  async function handleAddSong() {
    try {
      const res = await axios.post(
        "http://localhost:5001/songs",

        {
          title: songInput,
        },
      );

      setSongs((prev) => [...prev, res.data.song]);

      setSelectedSong(res.data.song.title);

      setSongInput(res.data.song.title);

      setShowResults(false);
    } catch (err) {
      console.log(err);
    }
  }

  /* -------------------- */
  /* CHECK VIDEO DATE */
  /* -------------------- */

  async function handleVideoSelect(file) {
    setVideo(file);

    const formData = new FormData();

    formData.append("video", file);

    try {
      const res = await axios.post(
        "http://localhost:5001/check-video-date",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.data.hasDetectedDate) {
        setShowManualDate(false);

        setDetectedDateLabel(res.data.detectedDate);

        setDate(new Date(res.data.detectedDate));
      } else {
        setShowManualDate(true);
      }
    } catch (err) {
      console.log(err);

      setShowManualDate(true);
    }
  }

  /* -------------------- */
  /* SUBMIT */
  /* -------------------- */

  async function handleSubmit() {
    if (!video) {
      alert("Select a video");

      return;
    }

    const finalSong = selectedSong || songInput;

    if (!finalSong) {
      alert("Select a song");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", "");

      formData.append("description", description);

      formData.append("song", finalSong);

      formData.append(
        "date",

        date.toISOString().split("T")[0],
      );

      formData.append("video", video);

      await axios.post(
        "http://localhost:5001/upload-video",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      onUploadSuccess();

      onClose();
    } catch (err) {
      console.log(err);

      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* HEADER */}

        <div className="modal-header">
          <h2>Add Practice Session</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {/* SONG SEARCH */}

        <div className="song-search-wrapper">
          <input
            placeholder="Search or add song"
            value={songInput}
            onFocus={() => setShowResults(true)}
            onChange={(e) => {
              setSongInput(e.target.value);

              setSelectedSong("");

              setShowResults(true);
            }}
          />

          {/* RESULTS */}

          {showResults && songInput && (
            <div className="song-results">
              {filteredSongs.map((song) => (
                <button
                  key={song.id}
                  className="song-result"
                  onClick={() => handleSongSelect(song.title)}
                >
                  {song.title}
                </button>
              ))}

              {/* ADD NEW */}

              {!songs.some(
                (song) => song.title.toLowerCase() === songInput.toLowerCase(),
              ) && (
                <button
                  className="song-result add-new-song"
                  onClick={handleAddSong}
                >
                  + Add "{songInput}"
                </button>
              )}
            </div>
          )}
        </div>

        {/* DATE */}

        {showManualDate ? (
          <DatePicker
            selected={date}
            onChange={(selectedDate) => setDate(selectedDate)}
            dateFormat="MMMM d, yyyy"
            className="custom-datepicker"
          />
        ) : (
          <div className="detected-date-box">
            🎥 Recording date detected: <strong>{detectedDateLabel}</strong>
          </div>
        )}

        {/* DESCRIPTION */}

        {!showDescription && (
          <button
            className="add-description-btn"
            onClick={() => setShowDescription(true)}
          >
            + Add description
          </button>
        )}

        {showDescription && (
          <textarea
            placeholder="Write thoughts, progress, ideas..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        )}

        {/* VIDEO */}

        <label className="video-upload-box">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleVideoSelect(e.target.files[0])}
          />

          <div>{video ? video.name : "Select video"}</div>
        </label>

        {/* SAVE */}

        <button className="save-btn" onClick={handleSubmit}>
          {loading ? "Uploading..." : "Save Session"}
        </button>
      </div>
    </div>
  );
}

export default AddVideoModal;
