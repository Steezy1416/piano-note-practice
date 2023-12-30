import { useEffect, useRef } from "react";
import PianoNote from "./PianoNote";
import "./treblePiano.css";

const Piano = ({ noteDisplay, clefNotes, setPianoHasFocus, pianoHasFocus }) => {
  const pianoRef = useRef(null);
  const noteRefs = useRef([]);

  useEffect(() => {
    pianoRef.current.focus();
  }, [pianoHasFocus]);

  const getPlayedNote = (e) => {
    const notesWithSharps = clefNotes.filter((note) => note.sharp);
    const sharpNotes = notesWithSharps.map((note) => note.sharp);
    const allNotes = [...clefNotes, ...sharpNotes];
    const playedNote = allNotes.filter((note) => note.key === e.key)[0] || "";

    return playedNote.noteIndex;
  };

  const playNote = (noteIndex) => {
    noteRefs.current[noteIndex].play();
  };

  const stopNote = (noteIndex) => {
    setTimeout(() => {
      noteRefs.current[noteIndex].pause();
      noteRefs.current[noteIndex].currentTime = 0;
    }, 400);
  };

  const handleKeyDown = (e) => {
    let playedNote = getPlayedNote(e);
    if (playedNote >= 0) {
      playNote(playedNote);
    }
  };

  const handleKeyUp = (e) => {
    let playedNote = getPlayedNote(e);
    if (playedNote >= 0) {
      stopNote(playedNote);
    }
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
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                ref={(ref) => (noteRefs.current[note.noteIndex] = ref)}
              />
              <PianoNote
                note={note.sharp}
                playNote={playNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                ref={(ref) => (noteRefs.current[note.sharp.noteIndex] = ref)}
              />
            </div>
          ) : (
            <PianoNote
              key={note.key}
              note={note}
              playNote={playNote}
              noteDisplay={noteDisplay}
              stopNote={stopNote}
              ref={(ref) => (noteRefs.current[note.noteIndex] = ref)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Piano;
