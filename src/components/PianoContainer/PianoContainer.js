import { useState } from "react";
import Piano from "../Piano/Piano";
import PianoController from "./PianoController";

import "./pianoContainer.css";
import octaveNotes from "../Piano/octaveNotes";

const PianoContainer = () => {
  const [noteDisplay, setNoteDisplay] = useState("notes");
  const [currentClefNotes, setCurrentClefNotes] = useState(octaveNotes[2]);
  const [pianoHasFocus, setPianoHasFocus] = useState(true);
  const [isSustainOn, setIsSustainOn] = useState(false);

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
        />
        <Piano
          noteDisplay={noteDisplay}
          clefNotes={currentClefNotes}
          setPianoHasFocus={setPianoHasFocus}
          pianoHasFocus={pianoHasFocus}
          isSustainOn={isSustainOn}
        />
      </div>
    </div>
  );
};

export default PianoContainer;
