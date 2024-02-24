import { useState } from "react";
import MusicStaff from "./musicStaff/MusicStaff";
import PianoContainer from "./PianoContainer/PianoContainer";
import {
  bassClefQuestions,
  trebleClefQuestions,
} from "./musicStaff/noteQuestions";

const PianoStaffContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(Math.floor(Math.random() * 23));
  const [currentQuestions, setCurrentQuestions] = useState(trebleClefQuestions);

  return (
    <div className="app-container">
      <MusicStaff
        currentQuestionIndex={currentQuestionIndex}
        currentQuestions={currentQuestions}
      />
      <PianoContainer
        currentQuestions={currentQuestions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
};

export default PianoStaffContainer;
