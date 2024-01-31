import { useState } from "react";
import octaveNotes from "../Piano/octaveNotes";

const PianoController = ({
  noteDisplay,
  setNoteDisplay,
  setCurrentClefNotes,
  setPianoHasFocus,
  isSustainOn,
  setIsSustainOn,
  setCurrentOctave
}) => {
  const handleDisplayPick = (option) => {
    switch (option) {
      case 1: {
        if (noteDisplay === "notes") {
          setNoteDisplay("none");
        } else {
          setNoteDisplay("notes");
        }
        setPianoHasFocus(true);
        break;
      }
      case 2: {
        if (noteDisplay === "keys") {
          setNoteDisplay("none");
        } else {
          setNoteDisplay("keys");
        }
        setPianoHasFocus(true);
        break;
      }
      default: {
        setNoteDisplay("notes");
        setPianoHasFocus(true);
        break;
      }
    }
  };
  const [currentOctaveIndex, setCurrentOctaveIndex] = useState(2);
  const octaveOptions = [1, 2, 3, 4, 5, 6, 7];

  const handleOctaveChange = (index) => {
    setCurrentOctaveIndex(index);
    setCurrentClefNotes(octaveNotes[index]);
    setCurrentOctave(index + 1)
    setPianoHasFocus(true);
  };

  const handleSustain = () => {
    setIsSustainOn(!isSustainOn);
    setPianoHasFocus(true);
  };

  return (
    <div className="piano-controller-container">
      <button
        className={
          isSustainOn ? "sustain-btn active-sustain-btn" : "sustain-btn"
        }
        onClick={handleSustain}
      >
        <div className="active-circle"></div>
        SUSTAIN
      </button>

      <div className="octave-selection-container">
        Octave
        <div className="octave-row">
          {octaveOptions.map((option, index) => {
            return (
              <button
                key={option}
                className={
                  currentOctaveIndex === index
                    ? "octave-btn active-octave-btn"
                    : "octave-btn"
                }
                onClick={() => handleOctaveChange(index)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="display-container">
        <p className="display-title">Display</p>
        <div className="display-option-container">
          <div
            className={`displayOption ${
              noteDisplay === "notes" && "active-display-option"
            }`}
            onClick={() => handleDisplayPick(1)}
          >
            <div className="active-circle"></div>
            Notes
          </div>
          <div
            className={`displayOption ${
              noteDisplay === "keys" && "active-display-option"
            } desktop-only`}
            onClick={() => handleDisplayPick(2)}
          >
            <div className="active-circle"></div>
            Keys
          </div>
        </div>
      </div>
    </div>
  );
};

export default PianoController;
