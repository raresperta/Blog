import "../styles/music.css";

import {
  songs,
  videos,
  tutorials
} from "../data/musicData";

import MusicNavbar from "../components/music/MusicNavbar";
import MusicHero from "../components/music/MusicHero";
import SongsCard from "../components/music/SongsCard";
import VideosCard from "../components/music/VideosCard";
import TutorialsCard from "../components/music/TutorialsCard";

function Music() {
  return (
    <div className="music-page">

      <MusicNavbar />

      <MusicHero />

      <section className="music-grid">

        <SongsCard songs={songs} />

        <VideosCard videos={videos} />

        <TutorialsCard tutorials={tutorials} />

      </section>

    </div>
  );
}

export default Music;