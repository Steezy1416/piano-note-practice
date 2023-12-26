import { useEffect, useRef } from "react";

const TrebleNote = ({ note, playNote, currentNote }) => {
  const { name, sound, isSharp, key } = note;

  const noteRef = useRef(null);

  if(currentNote && currentNote === name){
    playNote(noteRef)
  }
  
  return (
    <button onClick={() => playNote(noteRef)}>
      {name}
      <audio ref={noteRef} src={sound} />
    </button>
  );
};

export default TrebleNote;
