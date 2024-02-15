import { useState } from "react";
import Piano from "../Piano/Piano";
import PianoController from "./PianoController";

import "./pianoContainer.css";
import octaveNotes from "../Piano/octaveNotes";

const PianoContainer = ({currentQuestionIndex, setCurrentQuestionIndex}) => {
  const [noteDisplay, setNoteDisplay] = useState("notes");
  const [currentClefNotes, setCurrentClefNotes] = useState(octaveNotes[3]);
  const [pianoHasFocus, setPianoHasFocus] = useState(true);
  const [isSustainOn, setIsSustainOn] = useState(false);
  const [currentOctave, setCurrentOctave] = useState(4)

  return (
    <div className="piano-container">
      <div className="max-width-wrapper">
        <PianoController
          noteDisplay={noteDisplay}
          setNoteDisplay={setNoteDisplay}
          setCurrentClefNotes={setCurrentClefNotes}
          setPianoHasFocus={setPianoHasFocus}
          isSustainOn={isSustainOn}
          setIsSustainOn={setIsSustainOn}
          setCurrentOctave={setCurrentOctave}
        />
        <Piano
          noteDisplay={noteDisplay}
          clefNotes={currentClefNotes}
          setPianoHasFocus={setPianoHasFocus}
          pianoHasFocus={pianoHasFocus}
          isSustainOn={isSustainOn}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentOctave={currentOctave}
          currentQuestionIndex={currentQuestionIndex}
        />
      </div>
    </div>
  );
};

export default PianoContainer;
