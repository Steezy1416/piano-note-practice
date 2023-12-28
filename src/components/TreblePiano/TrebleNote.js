import { useEffect, useRef } from "react";

const TrebleNote = ({
  note,
  playNote,
  currentNote,
  setCurrentNote,
  noteDisplay,
  stopNote,
  stopCurrentNote,
  setStopCurrentNote,
}) => {
  const { name, sound, isSharp, key } = note;

  const noteRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (currentNote && currentNote === name) {
      playNote(noteRef);
      setCurrentNote("");
    }

    if (stopCurrentNote && stopCurrentNote === name) {
      console.log(stopCurrentNote);
      stopNote(noteRef);
      setStopCurrentNote("");
    }
  }, [
    currentNote,
    name,
    playNote,
    setCurrentNote,
    setStopCurrentNote,
    stopCurrentNote,
    stopNote,
  ]);

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
    >
      {noteDisplay === "notes" ? name : noteDisplay === "keys" ? key : ""}
      <audio
        onPlay={handleAudio}
        onPause={handleAudio}
        ref={noteRef}
        src={sound}
        preload="none"
      />
    </button>
  );
};

export default TrebleNote;
