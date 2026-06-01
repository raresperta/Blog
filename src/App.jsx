import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Music from "./pages/Music";
import FilmJournal from "./pages/FilmJournal";
import MusicVideos from "./pages/MusicVideos";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/music" element={<Music />} />
      <Route path="/film" element={<FilmJournal/>}/>
      <Route
        path="/music/videos"
        element={<MusicVideos />}
      />
    </Routes>
  );
}

export default App;