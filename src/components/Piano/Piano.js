import { useEffect, useRef } from "react";
import PianoNote from "./PianoNote";
import "./treblePiano.css";

const Piano = ({
  noteDisplay,
  clefNotes,
  setPianoHasFocus,
  pianoHasFocus,
  isSustainOn,
}) => {
  const pianoRef = useRef(null);
  const noteRefs = useRef([]);
  const pianoNoteRefs = useRef([]);
  const noteTimers = useRef(
    Array.from({ length: 13 }, () => ({
      timeoutId: null,
    }))
  );
  const currentKeyIndex = useRef(null);

  const currentNoteSources = useRef([]);
  const audioContext = useRef(new AudioContext());

  const notesWithSharps = clefNotes.filter((note) => note.sharp);
  const sharpNotes = notesWithSharps.map((note) => note.sharp);
  let allNotes = [...clefNotes, ...sharpNotes];

  allNotes.sort((a, b) => a.noteIndex - b.noteIndex);

  useEffect(() => {
    const loadBuffers = async () => {
      const audioBufferArray = await Promise.all(
        allNotes.map(async (note) => {
          const response = await fetch(note.sound);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.current.decodeAudioData(
            arrayBuffer
          );
          return audioBuffer;
        })
      );
      noteRefs.current = audioBufferArray;
    };

    loadBuffers();
  });

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

  const updateKeys = (noteIndex) => {
    const isSharp = allNotes[noteIndex].isSharp;

    pianoNoteRefs.current[noteIndex].classList.toggle(
      isSharp ? "black-key-audio" : "white-key-audio"
    );
  };

  const playNote = (noteIndex, e) => {
    if (e.repeat) return;

    currentKeyIndex.current = noteIndex;

    const noteSource = audioContext.current.createBufferSource();
    noteSource.buffer = noteRefs.current[noteIndex];
    noteSource.connect(audioContext.current.destination);

    if (noteTimers.current[noteIndex].timeoutId) {
      clearTimeout(noteTimers.current[noteIndex].timeoutId);
      currentNoteSources.current[noteIndex].stop();
      currentNoteSources.current[noteIndex].currentTime = 0;
      updateKeys(noteIndex);
    }

    noteSource.start();
    currentNoteSources.current[noteIndex] = noteSource;
    updateKeys(noteIndex);
  };

  const stopNote = (noteIndex, e) => {
    if (
      !pianoNoteRefs.current[noteIndex].classList.contains("white-key-audio") &&
      !pianoNoteRefs.current[noteIndex].classList.contains("black-key-audio")
    ) {
      return;
    }

    const noteSource = currentNoteSources.current[noteIndex];

    if (noteTimers.current[noteIndex].timeoutId) {
      clearTimeout(noteTimers.current[noteIndex].timeoutId);
    }

    noteTimers.current[noteIndex].timeoutId = setTimeout(
      () => {
        noteSource.stop();
        noteSource.currentTime = 0;
        noteTimers.current[noteIndex].timeoutId = null;
        updateKeys(noteIndex);
      },
      isSustainOn ? 1000 : 150
    );
  };

  const handleKeyDown = (e) => {
    let playedNote = getPlayedNote(e);
    if (playedNote >= 0) {
      playNote(playedNote, e);
    }
  };

  const handleKeyUp = (e) => {
    let playedNote = getPlayedNote(e);
    if (playedNote >= 0) {
      stopNote(playedNote);
    }
  };

  const handleMouseOut = (noteIndex) => {
    if (
      pianoNoteRefs.current[noteIndex].classList.contains("black-key-audio") ||
      pianoNoteRefs.current[noteIndex].classList.contains("white-key-audio")
    ) {
      stopNote(noteIndex);
    } else return;
  };

  return (
    <div className="treble-piano-content">
      <div
        className="treble-piano"
        onClick={() => pianoRef.current.focus()}
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
                currentKeyIndex={currentKeyIndex.current}
                handleMouseOut={handleMouseOut}
                ref={(ref) => (pianoNoteRefs.current[note.noteIndex] = ref)}
              />
              <PianoNote
                note={note.sharp}
                playNote={playNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
                currentKeyIndex={currentKeyIndex.current}
                handleMouseOut={handleMouseOut}
                ref={(ref) =>
                  (pianoNoteRefs.current[note.sharp.noteIndex] = ref)
                }
              />
            </div>
          ) : (
            <PianoNote
              key={note.key}
              note={note}
              playNote={playNote}
              noteDisplay={noteDisplay}
              stopNote={stopNote}
              currentKeyIndex={currentKeyIndex.current}
              handleMouseOut={handleMouseOut}
              ref={(ref) => (pianoNoteRefs.current[note.noteIndex] = ref)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Piano;
