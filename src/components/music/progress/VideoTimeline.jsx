import { useState } from "react";

import "../../../styles/music/progress/VideoTimeline.css";

import SongFolders from "./SongFolders.jsx";

function VideoTimeline({ videos,songs, onOpenFolder}) {
  const groupedByMonth = {};
  videos.forEach((video) => {
    const month = new Date(video.date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groupedByMonth[month]) {
      groupedByMonth[month] = {};
    }

    if (!groupedByMonth[month][video.song]) {
      groupedByMonth[month][video.song] = [];
    }

    groupedByMonth[month][video.song].push(video);
  });

  /* -------------------- */
  /* CURRENT MONTH */
  /* -------------------- */

  const currentMonth = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  /* -------------------- */
  /* COLLAPSED STATE */
  /* -------------------- */

  const [openMonths, setOpenMonths] = useState({
    [currentMonth]: true,
  });

  /* -------------------- */
  /* TOGGLE */
  /* -------------------- */

  function toggleMonth(month) {
    setOpenMonths((prev) => ({
      ...prev,

      [month]: !prev[month],
    }));
  }

  /* -------------------- */

  return (
    <div className="timeline-wrapper">
      {Object.entries(groupedByMonth).map(([month, piese]) => {
        const isOpen = openMonths[month];

        return (
          <div
            className={`month-group ${isOpen ? "open" : "collapsed"}`}
            key={month}
          >
            {/* HEADER */}

            <button className="month-header" onClick={() => toggleMonth(month)}>
              <div className="month-header-left">
                <h2>{month}</h2>
              </div>
            </button>
            {/* CONTENT */}

            <div className={`month-content ${isOpen ? "open" : ""}`}>
              <SongFolders groupedSongs={piese} songs={songs} onOpenFolder={onOpenFolder}/>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoTimeline;
