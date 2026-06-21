import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Music from "./pages/Music";
import FilmJournal from "./pages/FilmJournal";
import MusicVideos from "./pages/MusicVideos";
import MusicCreationsPage from "./pages/MusicCreationsPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/music" element={<Music />} />
      <Route path="/film" element={<FilmJournal />} />
      <Route path="/music/videos" element={<MusicVideos />} />
      <Route path="/music/creations" element={<MusicCreationsPage />} />
    </Routes>
  );
};

export default App;
