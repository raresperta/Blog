import { useState, useEffect } from "react";
import axios from "axios";

import MusicNavbar from "../components/music/MusicNavbar";
import LearningSidebar from "../components/music/learning/LearningSidebar";
import LearningDetails from "../components/music/learning/LearningDetails";
import PedalSection from "../components/music/learning/PedalSection";

import NewLearningSongModal from "../components/music/learning/NewLearningSongModal";


import {API_URL} from "../config";
import "../styles/music/learning/learningPage.css";

function MusicLearningPage() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [showModal, setShowModal] = useState(false);

  async function fetchSongs() {
    try {
      const res = await axios.get(`${API_URL}/learning`);

      setSongs(res.data);

      if (res.data.length > 0) {
        setSelectedSong(res.data[0]);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);

  function handleSongUpdate(updatedSong) {
    setSongs((prev) =>
      prev.map((song) => (song.id === updatedSong.id ? updatedSong : song)),
    );

    setSelectedSong(updatedSong);
  }

  function handleAddSong() {
    setShowModal(true);
  }

  async function handleSaveSong(song) {
    try {
      const formData = new FormData();

      formData.append("title", song.title);
      formData.append("artist", song.artist);

      if (song.coverImage) {
        formData.append("coverImage", song.coverImage);
      }

      const res = await axios.post(`${API_URL}/learning`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSongs((prev) => [res.data.song, ...prev]);
      setSelectedSong(res.data.song);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  async function handleSave(songData) {
    const res = await axios.post(
      `${API_URL}/learning/youtube`,
      songData,
    );

    setSongs((prev) => [res.data.song, ...prev]);
    setShowModal(false);
  }
  return (
    <div className="learning-page">
      <MusicNavbar />

      <div className="learning-layout">
        <div className="sidebar-area">
          <LearningSidebar
            songs={songs}
            selectedSong={selectedSong}
            onSelect={setSelectedSong}
            onAddSong={handleAddSong}
          />
        </div>
        <div className="details-area">
          <LearningDetails
            song={selectedSong}
            onSongUpdate={handleSongUpdate}
          />
        </div>
        <div className="pedals-area">
          <PedalSection song={selectedSong} onSongUpdate={handleSongUpdate} />
        </div>
      </div>
      {showModal && (
        <NewLearningSongModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default MusicLearningPage;
