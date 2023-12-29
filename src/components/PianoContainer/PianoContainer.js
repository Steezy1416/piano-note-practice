import { useState } from "react";
import Piano from "../Piano/Piano";
import PianoController from "./PianoController";

import "./pianoContainer.css";
import trebleNotes from "../Piano/trebleNotes";

const PianoContainer = () => {
  const [noteDisplay, setNoteDisplay] = useState("notes");
  const [currentClefNotes, setCurrentClefNotes] = useState(trebleNotes);
  const [pianoHasFocus, setPianoHasFocus] = useState(true)

  return (
    <div className="piano-container">
      <PianoController
        noteDisplay={noteDisplay}
        setNoteDisplay={setNoteDisplay}
        setCurrentClefNotes={setCurrentClefNotes}
        setPianoHasFocus={setPianoHasFocus}
      />
      <Piano noteDisplay={noteDisplay} clefNotes={currentClefNotes}  setPianoHasFocus={setPianoHasFocus} pianoHasFocus={pianoHasFocus}/>
    </div>
  );
};

export default PianoContainer;
