import { useState } from "react";
import Piano from "../Piano/Piano";
import PianoController from "./PianoController";

import "./pianoContainer.css";
import octaveNotes from "../Piano/octaveNotes";

const PianoContainer = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  currentQuestions,
  minMax,
}) => {
  const [pianoSettings, setPianoSettings] = useState({
    currentOctaveIndex: 3,
    currentOctaveNotes: octaveNotes[3],
    isSustainOn: true,
    pianoHasFocus: true,
    letterTypeOnNote: "notes",
  });

  return (
    <div className="piano-container">
      <div className="max-width-wrapper">
        <PianoController
          pianoSettings={pianoSettings}
          setPianoSettings={setPianoSettings}
        />
        <Piano
          pianoSettings={pianoSettings}
          setPianoSettings={setPianoSettings}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          currentQuestionIndex={currentQuestionIndex}
          currentQuestions={currentQuestions}
          minMax={minMax}
        />
      </div>
    </div>
  );
};

export default PianoContainer;
