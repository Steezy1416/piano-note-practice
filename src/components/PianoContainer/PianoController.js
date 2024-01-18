import { useState } from "react";
import getOctaveNotes from "../Piano/octaveNotes";

const PianoController = ({
  noteDisplay,
  setNoteDisplay,
  setCurrentClefNotes,
  setPianoHasFocus,
  isSustainOn,
  setIsSustainOn,
}) => {
  const handleDisplayPick = (option) => {
    switch (option) {
      case 1: {
        setNoteDisplay("notes");
        setPianoHasFocus(true);
        break;
      }
      case 2: {
        setNoteDisplay("keys");
        setPianoHasFocus(true);
        break;
      }
      case 3: {
        setNoteDisplay("none");
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

  const handleOctaveChange = (e) => {
    setCurrentOctaveIndex(e.target.value);
    setCurrentClefNotes(getOctaveNotes(e.target.value));
    setPianoHasFocus(true);
  };

  const handleSustain = () => {
    setIsSustainOn(!isSustainOn);
    setPianoHasFocus(true);
  };

  return (
    <div className="piano-controller-container">
      <div
        className={`${
          isSustainOn ? "sustain-btn-wrapper sustain-on" : "sustain-btn-wrapper"
        }`}
      >
        <button className={`sustain-btn`} onClick={handleSustain}>
          SUSTAIN
        </button>
      </div>
      <div className="wrapper">
        <div className="display-container">
          <p className="display-title">Display</p>
          <div className="display-option-container">
            <div
              className={`displayOption ${
                noteDisplay === "notes" && "active-display-option"
              }`}
              onClick={() => handleDisplayPick(1)}
            >
              Notes
            </div>
            <div
              className={`displayOption ${
                noteDisplay === "keys" && "active-display-option"
              } desktop-only`}
              onClick={() => handleDisplayPick(2)}
            >
              Keys
            </div>
            <div
              className={`displayOption ${
                noteDisplay === "none" && "active-display-option"
              }`}
              onClick={() => handleDisplayPick(3)}
            >
              None
            </div>
          </div>
        </div>
      </div>
      <div>
        <select value={currentOctaveIndex} onChange={handleOctaveChange}>
          <option value={0}>1st Octave</option>
          <option value={1}>2nd Octave</option>
          <option value={2}>3rd Octave</option>
          <option value={3}>4th Octave</option>
          <option value={4}>5th Octave</option>
          <option value={5}>6th Octave</option>
          <option value={6}>7th Octave</option>
        </select>
      </div>
    </div>
  );
};

export default PianoController;
