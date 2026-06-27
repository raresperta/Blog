import { useRef, useState } from "react";
import axios from "axios";
import { pdfjs, Page, Document } from "react-pdf";
import workerSrc from "react-pdf/dist/pdf.worker.entry?url";

import PdfViewerModal from "./PdfViewerModal";
import ResourceLinkModal from "./ResourceLinkModal";

import "../../../styles/music/learning/resourceCard.css";
import { API_URL } from "../../../config";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function ResourceCard({ title, value, type, song, onSongUpdate }) {
  const fileInputRef = useRef(null);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  function getYoutubeEmbed(url) {
    if (!url) return null;
    if (url.includes("youtu.be/")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    }
    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${url.split("v=")[1].split("&")[0]}`;
    }
    if (url.includes("/shorts/")) {
      return `https://www.youtube.com/embed/${url.split("/shorts/")[1].split("?")[0]}`;
    }
    return null;
  }

  async function saveYoutubeUrl(url) {
    if (!url) return;
    const updatedSong = {
      ...song,
      lessonVideoUrl: type === "tutorial" ? url : song.lessonVideoUrl,
      backingTrackUrl: type === "backing" ? url : song.backingTrackUrl,
    };

    await axios.put(`${API_URL}/learning/${song.id}`, {
      lessonVideoUrl: updatedSong.lessonVideoUrl,
      backingTrackUrl: updatedSong.backingTrackUrl,
      pedals: song.pedals,
    });

    onSongUpdate(updatedSong);
    setShowLinkModal(false);
  }

  async function handleAdd() {
    if (type === "tutorial" || type === "backing") {
      setShowLinkModal(true);
      return;
    }
    if (type === "pdf") {
      fileInputRef.current?.click();
    }
  }

  async function handlePdfUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("tabPdf", file);

    const res = await axios.post(
      `${API_URL}/learning/${song.id}/pdf`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    onSongUpdate({
      ...song,
      tabPdf: res.data.tabPdf,
    });
  }

  return (
    <>
      <div
        className="resource-card"
        onClick={() => {
          if (!value) {
            handleAdd();
          } else if (type === "pdf") {
            setShowPdfModal(true);
          }
        }}
        style={{ position: "relative" }} // Necesar pentru overlay-ul absolut
      >
        <h4>{title}</h4>

        {value ? (
          <div className="resource-preview">
            {(type === "tutorial" || type === "backing") && (
              <iframe
                src={getYoutubeEmbed(value)}
                title={title}
                allowFullScreen
              />
            )}

            {type === "pdf" && (
              <div
                className="pdf-preview"
                style={{
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  pointerEvents: "none",
                  // 📍 Centrare perfectă cu Flexbox
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <Document file={value}>
                  <Page
                    pageNumber={1}
                    width={300} // Poți mări/micșora valoarea asta ca să se potrivească perfect în card (ex: 200 sau 220)
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>

                {/* Stratul invizibil deasupra care blochează interacțiunea */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 10,
                    background: "transparent",
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="resource-empty">+</div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          hidden
          onChange={handlePdfUpload}
        />
      </div>

      {showPdfModal && (
        <PdfViewerModal pdfUrl={value} onClose={() => setShowPdfModal(false)} />
      )}

      {showLinkModal && (
        <ResourceLinkModal
          title={`Add ${title}`}
          onClose={() => setShowLinkModal(false)}
          onSave={saveYoutubeUrl}
        />
      )}
    </>
  );
}

export default ResourceCard;
