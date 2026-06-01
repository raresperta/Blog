import SectionHeader from "./SectionHeader";

function SongsCard({ songs }) {
  return (
    <div className="music-card">

      <SectionHeader
        title="🎵 Ascultă ce am creat"
      />

      <div className="song-list">

        {songs.map((song) => (
          <div
            className="song-item"
            key={song.id}
          >

            <div>
              <h4>{song.title}</h4>

              <p>
                {song.type} • {song.year}
              </p>
            </div>

            <button>▶</button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SongsCard;