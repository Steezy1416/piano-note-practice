import { useEffect, useRef, useState } from "react";
import TrebleNote from "./TrebleNote";
import trebleNotes from "./trebleNotes";
import "./treblePiano.css";

const TreblePiano = ({ noteDisplay }) => {
  const treblePianoRef = useRef(null);

  const [currentNote, setCurrentNote] = useState();
  const [stopCurrentNote, setStopCurrentNote] = useState();

  useEffect(() => {
    treblePianoRef.current.focus();
  }, []);

  const playNote = (note) => {
    note.current.play();
  };

  const stopNote = (note) => {
    console.log(note);
    note.current.pause();
    note.current.currentTime = 0;
  };

  const handleKeyDown = (e) => {
    const notesWithSharps = trebleNotes.filter((note) => note.sharp);
    const sharpNotes = notesWithSharps.map((note) => note.sharp);

    const allNotes = [...trebleNotes, ...sharpNotes];

    const playedNote = allNotes.filter((note) => note.key === e.key)[0];

    if (playedNote) {
      setCurrentNote(playedNote.name);
    } else return;
  };

  const handleKeyUp = (e) => {
    const notesWithSharps = trebleNotes.filter((note) => note.sharp);
    const sharpNotes = notesWithSharps.map((note) => note.sharp);

    const allNotes = [...trebleNotes, ...sharpNotes];

    const playedNote = allNotes.filter((note) => note.key === e.key)[0];

    console.log(playedNote);

    if (playedNote) {
      setStopCurrentNote(playedNote.name);
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
        onKeyUp={handleKeyUp}
      >
        {trebleNotes.map((note) => {
          return note.sharp ? (
            <div key={note.name} className="key-container">
              <TrebleNote
                note={note}
                playNote={playNote}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                stopCurrentNote={stopCurrentNote}
                setStopCurrentNote={setStopCurrentNote}
              />
              <TrebleNote
                note={note.sharp}
                playNote={playNote}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                stopCurrentNote={stopCurrentNote}
                setStopCurrentNote={setStopCurrentNote}
              />
            </div>
          ) : (
            <TrebleNote
              key={note.name}
              note={note}
              playNote={playNote}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
              noteDisplay={noteDisplay}
              stopNote={stopNote}
              stopCurrentNote={stopCurrentNote}
              setStopCurrentNote={setStopCurrentNote}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TreblePiano;
