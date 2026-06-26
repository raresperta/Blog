import "../../../styles/music/learning/effectCard.css";
import { useState } from "react";

function EffectCard({ pedal, onToggle, onModelChange, onKnobChange }) {
  const [showModels, setShowModels] = useState(false);

  const dialKnobs = pedal.knobs.filter((k) => k.type === "dial");
  const selectKnobs = pedal.knobs.filter((k) => k.type === "select");

  function startKnobDrag(e, knob) {
    e.preventDefault();

    const startY = e.clientY;
    const startValue = knob.value;

    function onMove(moveEvent) {
      const diff = startY - moveEvent.clientY;

      let newValue = startValue + diff * 0.4;
      newValue = Math.max(0, Math.min(100, Math.round(newValue)));

      onKnobChange(pedal.title, knob.label, newValue);
    }

    function stopDrag() {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", stopDrag);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", stopDrag);
  }

  return (
    <div className={`effect-card ${pedal.enabled ? "active" : "disabled"}`}>
      <div className="effect-top">
        <h4>{pedal.title}</h4>

        <div
          className={`effect-led ${pedal.enabled ? "on" : "off"}`}
          onClick={() => onToggle(pedal.title)}
        />
      </div>

      <div
        className="effect-model"
        onClick={() => setShowModels(!showModels)}
      >
        {pedal.model}
      </div>

      {showModels && (
        <div className="model-dropdown">
          {pedal.availableModels.map((model) => (
            <div
              key={model}
              className="model-option"
              onClick={() => {
                onModelChange(pedal.title, model);
                setShowModels(false);
              }}
            >
              {model}
            </div>
          ))}
        </div>
      )}

      <div className="knobs-row">
        {dialKnobs.map((knob) => (
          <div key={knob.label} className="knob-block">
            <div
              className="knob"
              onMouseDown={(e) => startKnobDrag(e, knob)}
            >
              <div
                className="knob-indicator"
                style={{
                  transform: `rotate(${
                    ((knob.value - knob.min) /
                      (knob.max - knob.min)) *
                      270 -
                    135
                  }deg)`,
                }}
              />
            </div>

            <div className="knob-value">
              {knob.value}
              {knob.suffix || ""}
            </div>

            <small>{knob.label}</small>
          </div>
        ))}
      </div>

      {selectKnobs.length > 0 && (
        <div className="select-row">
          {selectKnobs.map((knob) => (
            <div key={knob.label} className="select-block">
              <small>{knob.label}</small>

              <div className="select-wrapper">
                <select
                  className="knob-select"
                  value={knob.value}
                  onChange={(e) =>
                    onKnobChange(
                      pedal.title,
                      knob.label,
                      e.target.value
                    )
                  }
                >
                  {knob.options.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EffectCard;