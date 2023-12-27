import { useRef } from "react";

const TrebleNote = ({ note, playNote, currentNote, setCurrentNote }) => {
  const { name, sound, isSharp, key } = note;

  const noteRef = useRef(null);
  const buttonRef = useRef(null);

  const handleAudio = () => {
    buttonRef.current.classList.toggle(
      isSharp ? "black-key-audio" : "white-key-audio"
    );
  };

  if (currentNote && currentNote === name) {
    buttonRef.current.focus();
    playNote(noteRef);
    setCurrentNote("");
  }

  return (
    <button
      ref={buttonRef}
      className={`key-${key} ${isSharp ? "black-key" : "white-key"}`}
      onClick={() => playNote(noteRef)}
    >
      {name}
      <audio
        onPlay={handleAudio}
        onEnded={handleAudio}
        ref={noteRef}
        src={sound}
      />
    </button>
  );
};

export default TrebleNote;
