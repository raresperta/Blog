import { useState } from "react";

function ResourceLinkModal({ title, onClose, onSave }) {
  const [url, setUrl] = useState("");

  return (
    <div
      className="learning-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="learning-modal small-modal">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h2>{title}</h2>

        <div className="form-group">
          <label>YouTube Link</label>

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste link..."
          />
        </div>

        <button
          className="save-learning-btn"
          onClick={() => onSave(url)}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ResourceLinkModal;