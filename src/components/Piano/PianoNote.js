import { useEffect, useRef } from "react";

const PianoNote = ({
  note,
  playNote,
  currentNote,
  setCurrentNote,
  noteDisplay,
  stopNote,
  noteToStop,
  setNoteToStop,
}) => {
  const { name, sound, isSharp, key } = note;

  useEffect(() => {
    if (currentNote && currentNote === key) {
      playNote(noteRef);
      setCurrentNote("");
    }

    if (noteToStop && noteToStop === key) {
      stopNote(noteRef);
      setNoteToStop("");
    }
  }, [
    currentNote,
    key,
    playNote,
    setCurrentNote,
    setNoteToStop,
    noteToStop,
    stopNote,
  ]);

  const noteRef = useRef(null);
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
      onMouseDown={() => playNote(noteRef)}
      onMouseUp={() => stopNote(noteRef)}
      onMouseOut={() => stopNote(noteRef)}
      onTouchStart={() => playNote(noteRef)}
      onTouchEnd={() => stopNote(noteRef)}
    >
      {noteDisplay === "notes" ? name : noteDisplay === "keys" ? key : ""}
      <audio
        onPlay={handleAudio}
        onPause={handleAudio}
        ref={noteRef}
        src={sound}
        preload="auto"
        autoPlay={false}
      />
    </button>
  );
};

export default PianoNote;
