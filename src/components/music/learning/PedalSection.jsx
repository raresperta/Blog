import "../../../styles/music/learning/pedalSection.css";
import defaultPedals from "./defaultPedals";
import axios from "axios";

import { useState } from "react";
import EffectCard from "./EffectCard";
import { API_URL } from "../../../config";

function PedalSection({ song, onSongUpdate }) {
  if(!song) return;
  const pedals = song.pedals?.length > 0 ? song.pedals : defaultPedals;

  function changeModel(title, model) {
    const updated = pedals.map((p) =>
      p.title === title ? { ...p, model } : p,
    );

    savePedals(updated);
  }
  async function savePedals(updatedPedals) {
    await axios.put(`${API_URL}/learning/${song.id}`, {
      lessonVideoUrl: song.lessonVideoUrl,
      backingTrackUrl: song.backingTrackUrl,
      pedals: updatedPedals,
    });

    onSongUpdate({
      ...song,
      pedals: updatedPedals,
    });
  }
  function togglePedal(title) {
    const updated = pedals.map((p) =>
      p.title === title ? { ...p, enabled: !p.enabled } : p,
    );

    savePedals(updated);
  }

  function changeKnob(title, knobLabel, value) {
    const updated = pedals.map((pedal) =>
      pedal.title === title
        ? {
            ...pedal,
            knobs: pedal.knobs.map((knob) =>
              knob.label === knobLabel ? { ...knob, value } : knob,
            ),
          }
        : pedal,
    );

    savePedals(updated);
  }

  return (
    <div className="pedal-grid">
      {pedals.map((pedal) => (
        <EffectCard
          key={pedal.title}
          pedal={pedal}
          onToggle={togglePedal}
          onModelChange={changeModel}
          onKnobChange={changeKnob}
        />
      ))}
    </div>
  );
}

export default PedalSection;
