import { useEffect, useRef } from "react";
import PianoNote from "./PianoNote";
import "./treblePiano.css";
import {trebleClefQuestions, bassClefQuestions} from "../musicStaff/noteQuestions";

const Piano = ({
  noteDisplay,
  clefNotes,
  setPianoHasFocus,
  pianoHasFocus,
  isSustainOn,
  setCurrentQuestionIndex,
  currentOctave,
  currentQuestionIndex,
}) => {
  const pianoRef = useRef(null);
  const audioBufferRefs = useRef([]);
  const pianoNoteRefs = useRef([]);

  const notesCurrentlyPlaying = useRef(
    Array.from({ length: 13 }, () => ({
      audioBuffer: null,
      scheduledToStop: false,
      gain: null,
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

  const updateKeys = (noteIndex, isActive) => {
    if (isActive) {
      pianoNoteRefs.current[noteIndex].classList.add("currently-playing");
    } else {
      pianoNoteRefs.current[noteIndex].classList.remove("currently-playing");
    }
  };

  const updateKeyAnswerState = (noteIndex, isCorrect, isWrongOctave = false) => {
    let classState = isCorrect ? ["correct-key"] : ["wrong-key"];

    isWrongOctave ? classState = [classState, "wrong-octave"] : classState = [classState]

    pianoNoteRefs.current[noteIndex].classList.add(...classState);
  };

  const stopKeyAnswerState = (noteIndex) => {
    pianoNoteRefs.current[noteIndex].classList.remove(
      "correct-key",
      "wrong-key",
      "wrong-octave"
    );
  };

  let questionNote = bassClefQuestions[currentQuestionIndex].note;

  let questionOctave = bassClefQuestions[currentQuestionIndex].octave;

  const handleQuestion = (noteIndex) => {
    console.log(currentOctave + 1 === questionOctave);

    if (
      currentOctave + 1 === questionOctave &&
      allNotes[allNotes.length - 1] === allNotes[noteIndex] &&
      allNotes[noteIndex].name === questionNote
    ) {
      console.log("correct");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      updateKeyAnswerState(noteIndex, true)
      return;
    }

    if(currentOctave + 1 !== questionOctave && allNotes[noteIndex] === allNotes[allNotes.length -1]){
      updateKeyAnswerState(noteIndex, false, true)
      return
    }

    if (
      allNotes[noteIndex].name === questionNote &&
      currentOctave === questionOctave &&
      allNotes[allNotes.length - 1] !== allNotes[noteIndex]
    ) {
      console.log("correct");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      updateKeyAnswerState(noteIndex, true)
    } else if (
      allNotes[noteIndex].name === questionNote &&
      currentOctave !== questionOctave
    ) {
      console.log("wrong octave");
      updateKeyAnswerState(noteIndex, false, true)
    }
     else if (
      allNotes[noteIndex].name !== questionNote &&
      currentOctave === questionOctave
    ) {
      console.log("wrong note");
      updateKeyAnswerState(noteIndex, false)
    } else {
      console.log("wrong note and wrong octave");
      updateKeyAnswerState(noteIndex, false, true)
    }
  };

  const playNote = (noteIndex, e) => {
    //stops note from playing over and over again if key is help down wihtout moving
    if (e.repeat) return;
    const currentNote = notesCurrentlyPlaying.current[noteIndex];

    //gets and connects the audio source to the speakers
    const noteSource = audioContext.current.createBufferSource();

    const gainNode = audioContext.current.createGain();
    noteSource.buffer = audioBufferRefs.current[noteIndex];
    noteSource.connect(gainNode);
    gainNode.connect(audioContext.current.destination);

    //prevents note from ringing continuosly if notes gets played twice without calling stop note in the process
    if (currentNote.audioBuffer) {
      if (
        currentNote.audioBuffer.context.state === "running" &&
        currentNote.scheduledToStop === false
      ) {
        return;
      }
    }

    //if a note is ringing and is scheduled to stop after a few seconds it will stop the note immediately
    if (currentNote.scheduledToStop) {
      //gain prevents clicking noise when audio ends
      currentNote.scheduledToStop = false;
      gainNode.gain.setTargetAtTime(0, audioContext.current.currentTime, 0.001);
      currentNote.audioBuffer.stop(audioContext.current.currentTime + 2.5);
      currentNote.audioBuffer.currentTime = 0;
      updateKeys(noteIndex);
    }

    gainNode.gain.setValueAtTime(1, audioContext.current.currentTime);

    //plays audio
    noteSource.start();
    //saves the note that is playing in array
    currentNote.audioBuffer = noteSource;
    currentNote.gain = gainNode;
    updateKeys(noteIndex, true);

    handleQuestion(noteIndex);
  };

  const stopNote = (noteIndex) => {
    // returns if a note that is not playing gets called to stop
    if (
      !pianoNoteRefs.current[noteIndex].classList.contains("currently-playing")
    ) {
      return;
    }

    const noteSource = notesCurrentlyPlaying.current[noteIndex];
    const currentTime = audioContext.current.currentTime;

    //when key gets released the note will stop ringing after a few seconds
    //gain prevents clicking noise when audio ends
    noteSource.gain.gain.setTargetAtTime(
      0,
      audioContext.current.currentTime,
      isSustainOn ? 0.8 : 0.015
    );
    noteSource.audioBuffer.stop(currentTime + (isSustainOn ? 2.2 : 2));
    noteSource.audioBuffer.currentTime = 0;
    noteSource.scheduledToStop = true;
    updateKeys(noteIndex, false);
    stopKeyAnswerState(noteIndex)
  };

  const handleKeyDown = (e) => {
    let playedNoteIndex = getPlayedNoteIndex(e);
    //prevents from running if you press an unregistered key
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
