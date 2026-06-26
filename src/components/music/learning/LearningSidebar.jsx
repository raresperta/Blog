import { useMemo, useState } from "react";
import LearningSongCard from "./LearningSongCard";
import "../../../styles/music/learning/learningSidebar.css";

function LearningSidebar({ songs, selectedSong, onSelect, onAddSong }) {
  const [search, setSearch] = useState("");

  const filteredSongs = useMemo(() => {
    const q = search.toLowerCase();

    return songs.filter((song) => {
      const title = song.title?.toLowerCase() || "";
      const artist = song.artist?.toLowerCase() || "";

      return title.includes(q) || artist.includes(q);
    });
  }, [songs, search]);

  return (
    <div className="learning-sidebar">
      <div className="sidebar-header">
        <h3>Piesele mele</h3>

        <button className="add-song-btn" onClick={onAddSong}>
          +
        </button>
      </div>

      <div className="sidebar-search">
        <input
          placeholder="Search song..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="learning-song-list">
        {filteredSongs.map((song) => (
          <LearningSongCard
            key={song.id}
            song={song}
            active={selectedSong?.id === song.id}
            onClick={() => onSelect(song)}
          />
        ))}
      </div>
    </div>
  );
}

export default LearningSidebar;
