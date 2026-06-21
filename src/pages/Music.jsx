import "../styles/music.css";

import { songs, tutorials } from "../data/musicData";

import { useEffect, useState } from "react";
import axios from "axios";

import MusicNavbar from "../components/music/MusicNavbar";
import MusicHero from "../components/music/MusicHero";
import SongsCard from "../components/music/SongsCard";
import VideosCard from "../components/music/VideosCard";
import TutorialsCard from "../components/music/TutorialsCard";


function Music() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      try {
        const res = await axios.get("http://localhost:5001/sessions");

        const latestVideos = [...res.data]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 2);

        setVideos(latestVideos);
      } catch (err) {
        console.log(err);
      }
    }

    loadVideos();
  }, []);
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
