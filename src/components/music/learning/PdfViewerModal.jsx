import { Document, Page } from "react-pdf";
import { useState } from "react";

import "../../../styles/music/learning/pdfViewerModal.css";

function PdfViewerModal({ pdfUrl, onClose }) {
  const [numPages, setNumPages] = useState(null);

  return (
    <div
      className="pdf-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          onClose();
        }
      }}
    >
      <button
        className="pdf-close-btn"
        onClick={(e) => {e.stopPropagation();onClose();}}
      >
        ✕
      </button>

      <div
        className="pdf-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) =>
            setNumPages(numPages)
          }
        >
          {Array.from(
            new Array(numPages),
            (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                width={900}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )
          )}
        </Document>
      </div>
    </div>
  );
}

export default PdfViewerModal;