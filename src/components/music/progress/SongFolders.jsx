import "../../../styles/music/progress/SongFolders.css";

function SongFolders({
  groupedSongs,
  songs,
  onOpenFolder,
}) {
  return (
    <div className="folders-grid">
      {Object.entries(groupedSongs).map(
        ([songName, sessions]) => {

          const currentSong = songs.find(
            (song) =>
              song.title.toLowerCase() ===
              songName.toLowerCase()
          );

          const isMastered =
            currentSong?.isMastered;

          return (
            <div
              className={`
                song-folder
                ${isMastered ? "mastered-folder" : ""}
              `}
              key={songName}
              onClick={() =>
                onOpenFolder({
                  songName,

                  sessions,
                })
              }
            >
              <div className="folder-stack">

                <img
                  className="stack-img back-1"
                  src={sessions[0].thumbnail}
                  alt=""
                />

                <img
                  className="stack-img back-2"
                  src={
                    sessions[1]?.thumbnail ||
                    sessions[0].thumbnail
                  }
                  alt=""
                />

                <img
                  className="stack-img front"
                  src={sessions[0].thumbnail}
                  alt=""
                />

              </div>

              <div className="folder-info">
                <h2>{songName}</h2>

                <p>
                  {sessions.length} sessions
                </p>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
}

export default SongFolders;