import { useState } from "react";
import "../../../styles/music/creations/newCreationModal.css";

function NewCreationModal({ onClose, onSave, type = "songs" }) {
  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState("");
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("draft");
  const [description, setDescription] = useState("");

  const [coverImage, setCoverImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const isLyrics = type === "lyrics";
  const needsCover = type === "songs";
  const needsAudio = type !== "lyrics";
  const needsMusicMeta = type === "songs";

  function handleSave() {
    if (!title.trim()) return;

    onSave({
      id: Date.now(),

      title,
      bpm,
      key,
      status,
      description,

      coverImage,
      audioFile,
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="song-modal">
        <div className="song-modal-header">
          <h2>New {type.slice(0, -1)}</h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="song-form">
          {needsCover && (
            <div className="cover-upload-section">
              <label className="cover-preview">
                {coverImage ? (
                  <img src={URL.createObjectURL(coverImage)} alt="" />
                ) : (
                  <span>+</span>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setCoverImage(e.target.files[0])}
                />
              </label>
            </div>
          )}

          <input
            placeholder="Song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {needsMusicMeta && (
            <div className="song-row">
              <input
                placeholder="BPM"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
              />

              <input
                placeholder="Key (Em, F#m...)"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            </div>
          )}

          <div className="status-buttons">
            <button
              type="button"
              className={status === "draft" ? "active" : ""}
              onClick={() => setStatus("draft")}
            >
              Draft
            </button>

            <button
              type="button"
              className={status === "working" ? "active" : ""}
              onClick={() => setStatus("working")}
            >
              Working
            </button>

            <button
              type="button"
              className={status === "finished" ? "active" : ""}
              onClick={() => setStatus("finished")}
            >
              Finished
            </button>
          </div>

          <textarea
            rows={isLyrics ? 12 : 4}
            placeholder={
              isLyrics ? "Write your lyrics here..." : "Description..."
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {needsAudio && (
            <label
              className={`audio-upload-btn ${audioFile ? "audio-selected" : ""}`}
            >
              {audioFile ? `✓ ${audioFile.name}` : "🎵 Upload Audio"}

              <input
                type="file"
                accept=".mp3,.wav,.flac"
                hidden
                onChange={(e) => setAudioFile(e.target.files[0])}
              />
            </label>
          )}

          <button className="save-song-btn" onClick={handleSave}>
            Save {type.slice(0, -1)}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCreationModal;
