import { useEffect, useRef, useState } from "react";
import PianoNote from "./PianoNote";
import "./treblePiano.css";

const Piano = ({ noteDisplay, clefNotes }) => {
  const pianoRef = useRef(null);

  const [currentNote, setCurrentNote] = useState();
  const [noteToStop, setNoteToStop] = useState();

  useEffect(() => {
    pianoRef.current.focus();
  }, []);

  const getPlayedNote = (e) => {
    const notesWithSharps = clefNotes.filter((note) => note.sharp);
    const sharpNotes = notesWithSharps.map((note) => note.sharp);
    const allNotes = [...clefNotes, ...sharpNotes];
    const playedNote = allNotes.filter((note) => note.key === e.key)[0] || "";

    return playedNote;
  };

  const playNote = (note) => {
    note.current.play();
  };

  const stopNote = (note) => {
    setTimeout(function () {
      note.current.pause();
      note.current.currentTime = 0;
    }, 100);
  };

  const handleKeyDown = (e) => {
    setCurrentNote(getPlayedNote(e).name);
  };

  const handleKeyUp = (e) => {
    setNoteToStop(getPlayedNote(e).name);
  };

  return (
    <div className="treble-piano-content">
      <div
        className="treble-piano"
        onClick={() => pianoRef.current.focus}
        tabIndex={0}
        ref={pianoRef}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      >
        {clefNotes.map((note) => {
          return note.sharp ? (
            <div key={note.name} className="key-container">
              <PianoNote
                note={note}
                playNote={playNote}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                noteToStop={noteToStop}
                setNoteToStop={setNoteToStop}
              />
              <PianoNote
                note={note.sharp}
                playNote={playNote}
                currentNote={currentNote}
                setCurrentNote={setCurrentNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                noteToStop={noteToStop}
                setNoteToStop={setNoteToStop}
              />
            </div>
          ) : (
            <PianoNote
              key={note.name}
              note={note}
              playNote={playNote}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
              noteDisplay={noteDisplay}
              stopNote={stopNote}
              noteToStop={noteToStop}
              setNoteToStop={setNoteToStop}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Piano;
