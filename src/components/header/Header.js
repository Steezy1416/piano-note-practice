import { useState } from "react";
import "./header.css";
import "./rangeSelector.css";
import {
  allClefQuestions,
  bassClefQuestions,
  trebleClefQuestions,
} from "../musicStaff/noteQuestions";
import RangeSelector from "./RangeSelector";

const Header = ({
  setCurrentQuestions,
  minMax,
  setMinMax,
  setCurrentQuestionIndex,
}) => {
  const [isModalActive, setIsModalActive] = useState(false);

  const [onClefRange, setOnClefRange] = useState(false);

  return (
    <div className="header-container">
      <div
        onClick={() => setIsModalActive(false)}
        className={isModalActive ? "overlay" : "hide"}
      ></div>
      <header>
        <i
          onClick={() => setIsModalActive(true)}
          className="fa-solid fa-gear fa-2x gear-icon"
        ></i>
        <div className={isModalActive ? "setting-max-width" : "hide"}>
          <div className="settings-modal">
            <div className="settings-options-container">
              <div onClick={() => setOnClefRange(false)}>Clef</div>
              <div onClick={() => setOnClefRange(true)}>Range</div>
              <i
                onClick={() => setIsModalActive(false)}
                className="fa-solid fa-xmark close-icon"
              ></i>
            </div>
            <div className="content-box">
              {onClefRange ? (
                <RangeSelector
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  minMax={minMax}
                  setMinMax={setMinMax}
                />
              ) : (
                <ClefSelector
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  minMax={minMax}
                  setCurrentQuestions={setCurrentQuestions}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

const ClefSelector = ({
  setCurrentQuestionIndex,
  minMax,
  setCurrentQuestions,
}) => {
  const { min, max } = minMax;

  const handleQuestionChange = (questions) => {
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(Math.floor(Math.random() * (max - min) + min));
  };

  return (
    <>
      <button onClick={() => handleQuestionChange(trebleClefQuestions)}>
        Treble Clef
      </button>
      <button onClick={() => handleQuestionChange(bassClefQuestions)}>
        Bass Clef
      </button>
      <button onClick={() => handleQuestionChange(allClefQuestions)}>
        Both
      </button>
    </>
  );
};

export default Header;
