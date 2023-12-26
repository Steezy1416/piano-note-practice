import { useRef } from "react";

const TrebleNote = ({ note, playNote, currentNote, setCurrentNote }) => {
  const { name, sound, isSharp, key } = note;

  const noteRef = useRef(null);

  if (currentNote && currentNote === name) {
    playNote(noteRef);
    setCurrentNote("");
  }

  return (
    <button onClick={() => playNote(noteRef)}>
      {name}
      <audio ref={noteRef} src={sound} />
    </button>
  );
};

export default TrebleNote;
