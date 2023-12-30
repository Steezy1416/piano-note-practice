import { forwardRef, useRef } from "react";

const PianoNote = forwardRef(
  ({ note, playNote, noteDisplay, stopNote }, ref) => {
    const { name, sound, isSharp, key, noteIndex } = note;
    const buttonRef = useRef(null);

    const handleAudio = () => {
      buttonRef.current.classList.toggle(
        isSharp ? "black-key-audio" : "white-key-audio"
      );
    };

    return (
      <button
        ref={buttonRef}
        className={`key-${key} ${isSharp ? "black-key" : "white-key"}`}
        onMouseDown={() => playNote(noteIndex)}
        onMouseUp={() => stopNote(noteIndex)}
        onMouseOut={() => stopNote(noteIndex)}
        onTouchStart={() => playNote(noteIndex)}
        onTouchEnd={() => stopNote(noteIndex)}
      >
        {noteDisplay === "notes" ? name : noteDisplay === "keys" ? key : ""}
        <audio
          onPlay={handleAudio}
          onPause={handleAudio}
          ref={ref}
          src={sound}
          preload="auto"
          autoPlay={false}
        />
      </button>
    );
  }
);

export default PianoNote;
