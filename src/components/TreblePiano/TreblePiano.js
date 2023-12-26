import { useEffect, useRef, useState } from "react";
import TrebleNote from "./TrebleNote";
import trebleNotes from "./trebleNotes";
import "./treblePiano.css";

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
    if (playedNote) {
      setCurrentNote(playedNote.name);
    } else return;
  };

  return (
    <div className="treble-piano-content">
      <div
        className="treble-piano"
        onClick={() => treblePianoRef.current.focus}
        tabIndex={0}
        ref={treblePianoRef}
        onKeyDown={handleKeyDown}
      >
        {trebleNotes.map((note) => {
          return (
            <TrebleNote
              key={note.name}
              note={note}
              playNote={playNote}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreblePiano;
