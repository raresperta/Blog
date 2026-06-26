import "../styles/music.css";


import { useEffect, useState } from "react";
import axios from "axios";

import MusicNavbar from "../components/music/MusicNavbar";
import MusicHero from "../components/music/MusicHero";
import SongsCard from "../components/music/SongsCard";
import VideosCard from "../components/music/VideosCard";
import TutorialsCard from "../components/music/TutorialsCard";

import {API_URL} from "../config";


function Music() {
  const [videos, setVideos] = useState([]);
  const [creations, setCreations] = useState([]);
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
  async function loadData() {
    try {
      const [videosRes, creationsRes, tutorialsRes] =
        await Promise.all([
          axios.get(`${API_URL}/sessions`),
          axios.get(`${API_URL}/creations`),
          axios.get(`${API_URL}/learning`),
        ]);

      const latestVideos = [...videosRes.data]
        .sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        .slice(0, 4);

      setVideos(latestVideos);

      const latestCreations = [...creationsRes.data]
        .slice(0, 4);

      setCreations(latestCreations);

      const latestTutorials = [...tutorialsRes.data]
        .slice(0, 4);

      setTutorials(latestTutorials);
    } catch (err) {
      console.log(err);
    }
  }

  loadData();
}, []);
  return (
    <div className="music-page">
      <MusicNavbar />

      <MusicHero />

      <section className="music-grid">
        <SongsCard songs={creations} />

        <VideosCard videos={videos} />

        <TutorialsCard tutorials={tutorials} />
      </section>
    </div>
  );
}

export default Music;
