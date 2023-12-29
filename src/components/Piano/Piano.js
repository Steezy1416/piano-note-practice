import { useEffect, useRef, useState } from "react";
import PianoNote from "./PianoNote";
import "./treblePiano.css";

const Piano = ({ noteDisplay, clefNotes, setPianoHasFocus, pianoHasFocus }) => {
  const pianoRef = useRef(null);

  const [currentNote, setCurrentNote] = useState();
  const [noteToStop, setNoteToStop] = useState();

  useEffect(() => {
    pianoRef.current.focus();
    console.log("re render")
  }, [pianoHasFocus]);

  useEffect(() => {
    console.log("component rerendered");
  });

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
    setTimeout(() => {
      note.current.pause();
      note.current.currentTime = 0;
    }, 400);
  };

  const handleKeyDown = (e) => {
    setCurrentNote(getPlayedNote(e).key);
  };

  const handleKeyUp = (e) => {
    setNoteToStop(getPlayedNote(e).key);
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
        onBlur={() => setPianoHasFocus(false)}
      >
        {clefNotes.map((note) => {
          return note.sharp ? (
            <div key={note.key} className="key-container">
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
              key={note.key}
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
