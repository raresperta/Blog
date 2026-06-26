import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreationPlayerModal from "./creations/CreationPlayerModal";
import "../../styles/music/songsCard.css";

function SongsCard({ songs }) {
  const navigate = useNavigate();
  const [selectedCreation, setSelectedCreation] = useState(null);

  const icons = {
    songs: "🎵",
    samples: "🎛️",
    riffs: "🎸",
    drums: "🥁",
    lyrics: "📝",
  };

  return (
    <>
      <div className="music-card">
        <div className="card-header">
          <h3>🎬 Ascultă ce am creat</h3>

          <span onClick={() => navigate("/music/creations")}>Vezi toate</span>
        </div>

        <div className="song-list">
          {songs.map((song) => {
            const meta = [];

            if (song.type) meta.push(song.type);
            if (song.key) meta.push(song.key);
            if (song.bpm) meta.push(`${song.bpm} BPM`);

            return (
              <div className="song-item" key={song.id}>
                <div>
                  <h4>
                    {icons[song.type]} {song.title}
                  </h4>

                  <p>{meta.join(" • ")}</p>
                </div>

                <button onClick={() => setSelectedCreation(song)}>▶</button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCreation && (
        <CreationPlayerModal
          item={selectedCreation}
          onClose={() => setSelectedCreation(null)}
        />
      )}
    </>
  );
}

export default SongsCard;
