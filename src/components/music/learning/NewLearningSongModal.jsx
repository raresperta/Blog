import { useState } from "react";
import "../../../styles/music/learning/newLearningSongModal.css";

function NewLearningSongModal({ onClose, onSave }) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!youtubeUrl.trim()) return;

    try {
      setLoading(true);

      await onSave({
        youtubeUrl,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="learning-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="learning-modal">
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Add Learning Song</h2>

        <p className="learning-modal-subtitle">
          Paste a YouTube link and we’ll automatically extract:
          <br />
          song title, artist and thumbnail.
        </p>

        <div className="form-group">
          <label>YouTube Link</label>

          <input
            value={youtubeUrl}
            onChange={(e) =>
              setYoutubeUrl(e.target.value)
            }
            placeholder="https://youtube.com/watch?v=..."
          />
        </div>

        <button
          className="save-learning-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Importing..." : "Import Song"}
        </button>
      </div>
    </div>
  );
}

export default NewLearningSongModal;