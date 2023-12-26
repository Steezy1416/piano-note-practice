import { useEffect, useRef, useState } from "react";
import TrebleNote from "./TrebleNote";
import trebleNotes from "./trebleNotes";

const TreblePiano = () => {
  const treblePianoRef = useRef(null);

  const [currentNote, setCurrentNote] = useState();

  useEffect(() => {
    treblePianoRef.current.focus();
  }, []);

  const playNote = (note) => {
    note.current.play();
    note.current.currentTime = 0;
  };

  const handleKeyDown = (e) => {
    const playedNote = trebleNotes.filter((note) => note.key === e.key)[0];
    if(playedNote){
        setCurrentNote(playedNote.name);
    }
    else return
  };

  return (
    <div tabIndex={0} ref={treblePianoRef} onKeyDown={handleKeyDown}>
      {trebleNotes.map((note) => {
        return (
          <TrebleNote
            key={note.name}
            note={note}
            playNote={playNote}
            currentNote={currentNote}
          />
        );
      })}
    </div>
  );
};

export default TreblePiano;
