import { useRef } from "react";

const TrebleNote = ({ note, playNote, currentNote, setCurrentNote }) => {
  const { name, sound, isSharp, key } = note;

  const noteRef = useRef(null);
  const buttonRef = useRef(null)

  if (currentNote && currentNote === name) {
    buttonRef.current.focus()
    playNote(noteRef);
    setCurrentNote("");
  }
  console.log(currentNote);

  return (
    <button
    ref={buttonRef}
      className={isSharp ? "black-key" : "white-key"}
      onClick={() => playNote(noteRef)}
    >
      {name}
      <audio ref={noteRef} src={sound} />
    </button>
  );
};

export default TrebleNote;
