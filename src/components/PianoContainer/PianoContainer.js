import { useState } from "react";
import TreblePiano from "../TreblePiano/TreblePiano";
import PianoController from "./PianoController";

import "./pianoContainer.css"

const PianoContainer = () => {
  const [noteDisplay, setNoteDisplay] = useState("notes");

  return (
    <div className="piano-container">
      <PianoController
        noteDisplay={noteDisplay}
        setNoteDisplay={setNoteDisplay}
      />
      <TreblePiano noteDisplay={noteDisplay} />
    </div>
  );
};

export default PianoContainer;
