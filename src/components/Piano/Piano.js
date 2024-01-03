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
  const audioBufferRefs = useRef([]);
  const pianoNoteRefs = useRef([]);
  const noteTimers = useRef(
    Array.from({ length: 13 }, () => ({
      timeoutId: null,
    }))
  );

  const notesCurrentlyPlaying = useRef(
    Array.from({ length: 13 }, () => ({
      audioBuffer: null,
    }))
  );
  const audioContext = useRef(new AudioContext());

  const notesWithSharps = clefNotes.filter((note) => note.sharp);
  const sharpNotes = notesWithSharps.map((note) => note.sharp);
  let allNotes = [...clefNotes, ...sharpNotes];
  allNotes.sort((a, b) => a.noteIndex - b.noteIndex);

  //loads all sounds as buffers in an array so they are ready to be played
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
      audioBufferRefs.current = audioBufferArray;
    };

    loadBuffers();
  });

  // puts focus on the piano so it can listen to key down/up events
  useEffect(() => {
    pianoRef.current.focus();
  }, [pianoHasFocus]);

  const getPlayedNoteIndex = (e) => {
    const playedNote = allNotes.filter((note) => note.key === e.key)[0] || "";
    return playedNote.noteIndex;
  };

  const updateKeys = (noteIndex) => {
    pianoNoteRefs.current[noteIndex].classList.toggle("currently-playing");
  };

  const playNote = (noteIndex, e) => {
    //stops note from playing over and over again if key is help down wihtout moving
    if (e.repeat) return;

    //prevents note from playing wihtout being stopped if notes gets played twice without calling stop note in the middle
    if (notesCurrentlyPlaying.current[noteIndex].audioBuffer) {
      if (
        notesCurrentlyPlaying.current[noteIndex].audioBuffer.context.state ===
          "running" &&
        !noteTimers.current[noteIndex].timeoutId
      ) {
        notesCurrentlyPlaying.current[noteIndex].audioBuffer.stop();
        notesCurrentlyPlaying.current[noteIndex].audioBuffer.currentTime = 0;
        updateKeys(noteIndex);
      }
    }

    //gets and connects the audio source to the speakers
    const noteSource = audioContext.current.createBufferSource();
    noteSource.buffer = audioBufferRefs.current[noteIndex];
    noteSource.connect(audioContext.current.destination);

    /*
    if a note is ringing and is scheduled to stop after a few seconds it
    will cancel the timeout and stop the note immediately
    */
    if (noteTimers.current[noteIndex].timeoutId) {
      clearTimeout(noteTimers.current[noteIndex].timeoutId);
      notesCurrentlyPlaying.current[noteIndex].audioBuffer.stop();
      notesCurrentlyPlaying.current[noteIndex].audioBuffer.currentTime = 0;
      updateKeys(noteIndex);
    }

    //plays audio
    noteSource.start();
    //saves the note that is playing in array
    notesCurrentlyPlaying.current[noteIndex].audioBuffer = noteSource;
    updateKeys(noteIndex);
  };

  const stopNote = (noteIndex, e) => {
    // returns if a note that is not playing gets called to stop
    if (
      !pianoNoteRefs.current[noteIndex].classList.contains("currently-playing")
    ) {
      return;
    }

    const noteSource = notesCurrentlyPlaying.current[noteIndex].audioBuffer;

    // cancels the initial timeout if a note gets called to stop without it ever getting called to play
    if (noteTimers.current[noteIndex].timeoutId) {
      clearTimeout(noteTimers.current[noteIndex].timeoutId);
    }

    //when key gets released the note gets a timeoutId and will stop ringing after a few seconds
    noteTimers.current[noteIndex].timeoutId = setTimeout(
      () => {
        const updatedNotesCurrentlyPlaying = notesCurrentlyPlaying.current.map(
          (note) => {
            if (note.audioBuffer === noteSource) {
              return { audioBuffer: null };
            } else return note;
          }
        );
        noteSource.stop();
        noteSource.currentTime = 0;
        noteTimers.current[noteIndex].timeoutId = null;
        notesCurrentlyPlaying.current = updatedNotesCurrentlyPlaying;
        updateKeys(noteIndex);
      },
      isSustainOn ? 1000 : 150
    );
  };

  const handleKeyDown = (e) => {
    let playedNoteIndex = getPlayedNoteIndex(e);
    if (playedNoteIndex >= 0) {
      playNote(playedNoteIndex, e);
    }
  };

  const handleKeyUp = (e) => {
    let playedNoteIndex = getPlayedNoteIndex(e);
    if (playedNoteIndex >= 0) {
      stopNote(playedNoteIndex);
    }
  };

  const handleMouseOut = (noteIndex) => {
    // prevents errors if you hover out of notes that are not playing and stops the note if its playin and if you hover out of it
    if (
      pianoNoteRefs.current[noteIndex].classList.contains("currently-playing")
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
                handleMouseOut={handleMouseOut}
                ref={(ref) => (pianoNoteRefs.current[note.noteIndex] = ref)}
              />
              <PianoNote
                note={note.sharp}
                playNote={playNote}
                noteDisplay={noteDisplay}
                stopNote={stopNote}
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
