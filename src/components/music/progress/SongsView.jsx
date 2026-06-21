import "../../../styles/music/progress/SongsView.css";

function SongsView({ videos, songs, onSelectSong }) {
  const groupedSongs = {};
  console.log(songs);

  videos.forEach((video) => {
    if (!groupedSongs[video.song]) {
      groupedSongs[video.song] = [];
    }

    groupedSongs[video.song].push(video);
  });

  return (
    <div className="songs-view-grid">
      {Object.entries(groupedSongs).map(([songName, sessions]) => {
        const currentSong = songs.find(
          (song) => song.title.toLowerCase() === songName.toLowerCase(),
        );

        const isMastered = currentSong?.isMastered;

        return (
          <div
            className={`
                song-select-card
                ${isMastered ? "mastered-song" : ""}
              `}
            key={songName}
            onClick={() => onSelectSong(songName)}
          >
            <div className="song-select-stack">
              <img
                className="song-select-img back-1"
                src={sessions[0].thumbnail}
                alt=""
              />

              <img
                className="song-select-img back-2"
                src={sessions[1]?.thumbnail || sessions[0].thumbnail}
                alt=""
              />

              <img
                className="song-select-img front"
                src={sessions[0].thumbnail}
                alt=""
              />
            </div>

            <div className="song-select-info">
              <h2>{songName}</h2>

              <p>{sessions.length} sessions</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SongsView;
