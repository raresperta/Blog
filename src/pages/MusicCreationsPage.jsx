import { useState, useEffect } from "react";
import axios from "axios";

import MusicNavbar from "../components/music/MusicNavbar";
import NewCreationModal from "../components/music/creations/NewCreationModal";
import CreationsHero from "../components/music/creations/CreationsHero";
import CreationsGrid from "../components/music/creations/CreationsGrid";
import CreationPlayerModal from "../components/music/creations/CreationPlayerModal";

import {API_URL} from "../config";


import "../styles/music/musicCreations.css";

function MusicCreationsPage() {
  const [activeTab, setActiveTab] = useState("songs");

  const [showCreationModal, setShowCreationModal] = useState(false);

  const [creations, setCreations] = useState([]);

  const [selectedCreation, setSelectedCreation] = useState(null);

  const [contextMenu, setContextMenu] = useState(null);

  /* -------------------- */
  /* SAVE CREATION */
  /* -------------------- */

  async function handleDelete(id) {
    try {
      await axios.delete(`${API_URL}/creations/${id}`);

      setCreations((prev) => prev.filter((item) => item.id !== id));

      setContextMenu(null);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSaveNewCreation = async (creation) => {
    try {
      const formData = new FormData();

      formData.append("type", activeTab);
      formData.append("title", creation.title);
      formData.append("bpm", creation.bpm || "");
      formData.append("key", creation.key || "");
      formData.append("status", creation.status);
      formData.append("description", creation.description || "");

      if (creation.coverImage) {
        formData.append("coverImage", creation.coverImage);
      }

      if (creation.audioFile) {
        formData.append("audioFile", creation.audioFile);
      }

      const res = await axios.post(
        `${API_URL}/creations`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setCreations((prev) => [res.data.song, ...prev]);
      setShowCreationModal(false);
    } catch (err) {
      console.log(err);
      alert("Save failed");
    }
  };

  function handleRightClick(e, creation) {
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      creation,
    });
  }

  /* -------------------- */
  /* FETCH CREATIONS */
  /* -------------------- */

  async function fetchCreations() {
    try {
      const res = await axios.get(`${API_URL}/creations`);

      setCreations(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCreations();
  }, []);
  useEffect(() => {
    function closeMenu() {
      setContextMenu(null);
    }

    window.addEventListener("click", closeMenu);

    return () => window.removeEventListener("click", closeMenu);
  }, []);

  /* -------------------- */
  /* FILTERED ITEMS */
  /* -------------------- */

  const filteredCreations = creations.filter(
    (creation) => creation.type === activeTab,
  );

  /* -------------------- */

  return (
    <div className="music-creations-page">
      <MusicNavbar />

      <CreationsHero items={creations} />

      {/* TABS */}
      <div className="creations-toolbar">
        <div className="toolbar-left">

          <div className="creations-tabs">
            <button
              className={activeTab === "songs" ? "active-tab" : ""}
              onClick={() => setActiveTab("songs")}
            >
              Songs
            </button>

            <button
              className={activeTab === "samples" ? "active-tab" : ""}
              onClick={() => setActiveTab("samples")}
            >
              Samples
            </button>

            <button
              className={activeTab === "riffs" ? "active-tab" : ""}
              onClick={() => setActiveTab("riffs")}
            >
              Riffs
            </button>

            <button
              className={activeTab === "drums" ? "active-tab" : ""}
              onClick={() => setActiveTab("drums")}
            >
              Drums
            </button>

            <button
              className={activeTab === "lyrics" ? "active-tab" : ""}
              onClick={() => setActiveTab("lyrics")}
            >
              Lyrics
            </button>
          </div>
        </div>

        <button
          className="new-song-btn"
          onClick={() => setShowCreationModal(true)}
        >
          + New {activeTab.slice(0, -1)}
        </button>
      </div>

      {/* CONTENT */}

      <div className="creations-content">
        {filteredCreations.length > 0 ? (
          <CreationsGrid
            items={filteredCreations}
            showCover={activeTab === "songs"}
            onSelect={setSelectedCreation}
            onRightClick={handleRightClick}
          />
        ) : (
          <div className="empty-state">No {activeTab} yet.</div>
        )}
      </div>

      {/* CREATE MODAL */}

      {showCreationModal && (
        <NewCreationModal
          type={activeTab}
          onClose={() => setShowCreationModal(false)}
          onSave={handleSaveNewCreation}
        />
      )}

      {/* PLAYER MODAL */}

      {selectedCreation && (
        <CreationPlayerModal
          item={selectedCreation}
          type={activeTab}
          onClose={() => setSelectedCreation(null)}
        />
      )}
      {contextMenu && (
        <div
          className="creation-context-menu"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          <button onClick={() => handleDelete(contextMenu.creation.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default MusicCreationsPage;
