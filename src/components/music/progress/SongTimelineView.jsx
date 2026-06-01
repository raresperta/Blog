import { useState } from "react";

import VideoCard from "./VideoCard";

import "../../../styles/music/progress/SongTimelineView.css";

function SongTimelineView({ songName, videos, onBack, onOpenVideo }) {
  const groupedByMonth = {};

  videos.forEach((video) => {
    const month = new Date(video.date).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groupedByMonth[month]) {
      groupedByMonth[month] = [];
    }

    groupedByMonth[month].push(video);
  });

  const currentMonth = Object.keys(groupedByMonth)[0];

  const [openMonths, setOpenMonths] = useState({
    [currentMonth]: true,
  });

  function toggleMonth(month) {
    setOpenMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  }

  return (
    <div className="song-timeline-page">

      <div className="timeline-wrapper">
        {Object.entries(groupedByMonth).map(([month, monthVideos]) => {
          const isOpen = openMonths[month];

          return (
            <div
              className={`month-group ${isOpen ? "open" : "collapsed"}`}
              key={month}
            >
              <button
                className="month-header"
                onClick={() => toggleMonth(month)}
              >
                <h2>{month}</h2>
              </button>

              <div className={`month-content ${isOpen ? "open" : ""}`}>
                <div className="videos-grid">
                  {monthVideos.map((video) => (
                    <VideoCard
                      key={video._id}
                      video={video}
                      onOpenVideo={onOpenVideo}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongTimelineView;
