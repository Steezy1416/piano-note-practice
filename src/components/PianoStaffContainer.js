import { useState } from "react";
import MusicStaff from "./musicStaff/MusicStaff";
import PianoContainer from "./PianoContainer/PianoContainer";
import { trebleClefQuestions } from "./musicStaff/noteQuestions";
import Header from "./header/Header";

const PianoStaffContainer = () => {
  const [currentQuestions, setCurrentQuestions] = useState(trebleClefQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    Math.floor(Math.random() * currentQuestions.length)
  );
  const [minMax, setMinMax] = useState({
    min: 0,
    max: 23,
  });

  return (
    <div className="app-container">
      <Header
        setCurrentQuestions={setCurrentQuestions}
        minMax={minMax}
        setMinMax={setMinMax}
      ></Header>
      <MusicStaff
        currentQuestionIndex={currentQuestionIndex}
        currentQuestions={currentQuestions}
      />
      <PianoContainer
        currentQuestions={currentQuestions}
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        minMax={minMax}
      />
    </div>
  );
};

export default PianoStaffContainer;
