import { forwardRef } from "react";

const isTouchDevice = "ontouchstart" in document.documentElement;

const PianoNote = forwardRef(
  ({ note, playNote, letterTypeOnNote, stopNote, handleMouseOut }, ref) => {
    const { name, isSharp, key, noteIndex } = note;

    const handleStart = (e) => {
      playNote(noteIndex, e);
    };

    const handleEnd = (e) => {
      stopNote(noteIndex, e);
    };

    return (
      <button
        ref={ref}
        className={`key-${key} ${isSharp ? "black-key" : "white-key"}`}
        onMouseDown={isTouchDevice ? null : (e) => playNote(noteIndex, e)}
        onMouseUp={isTouchDevice ? null : (e) => stopNote(noteIndex, e)}
        onMouseOut={isTouchDevice ? null : () => handleMouseOut(noteIndex)}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
      >
        {letterTypeOnNote === "notes" ? name : letterTypeOnNote === "keys" ? key : ""}
      </button>
    );
  }
);

export default PianoNote;
