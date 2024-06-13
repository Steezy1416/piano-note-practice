import { useState } from "react";

const RangeSelector = ({ setCurrentQuestionIndex, minMax, setMinMax }) => {
  const [leftWholeNotePosition, setLeftWholeNotePosition] = useState(100);
  const [rightWholeNotePosition, setRightWholeNotePosition] = useState(-10);

  const { min, max } = minMax;

  console.log(minMax);

  const handleLeftUp = () => {
    let position = leftWholeNotePosition;

    if (position - 5 === -15) {
      return;
    }
    if (position - 5 === rightWholeNotePosition) {
      return;
    } else {
      setLeftWholeNotePosition(leftWholeNotePosition - 5);
      setMinMax({
        ...minMax,
        min: minMax.min + 1,
      });
      setCurrentQuestionIndex(
        Math.floor(Math.random() * (max - (minMax.min + 1)) + minMax.min + 1)
      );
    }
  };

  const handleLeftDown = () => {
    let position = leftWholeNotePosition;

    if (position + 5 === 105) {
      return;
    } else {
      setLeftWholeNotePosition(leftWholeNotePosition + 5);
      setMinMax({
        ...minMax,
        min: minMax.min - 1,
      });
      setCurrentQuestionIndex(
        Math.floor(Math.random() * (max - (minMax.min - 1)) + (minMax.min - 1))
      );
    }
  };

  const handleRighttUp = () => {
    let position = rightWholeNotePosition;

    if (position - 5 === -15) {
      return;
    } else {
      setRightWholeNotePosition(rightWholeNotePosition - 5);
      setMinMax({
        ...minMax,
        max: minMax.max + 1,
      });
      setCurrentQuestionIndex(
        Math.floor(Math.random() * (minMax.max + 1 - min) + min)
      );
    }
  };

  const handleRightDown = () => {
    let position = rightWholeNotePosition;

    if (position + 5 === 105) {
      return;
    }
    if (position + 5 === leftWholeNotePosition) {
      return;
    } else {
      setRightWholeNotePosition(rightWholeNotePosition + 5);
      setMinMax({
        ...minMax,
        max: minMax.max - 1,
      });
      setCurrentQuestionIndex(
        Math.floor(Math.random() * (minMax.max - 1 - min) + min)
      );
    }
  };

  return (
    <div className="range-selector-container">
      <div>
        <button onClick={handleLeftUp}>Up</button>
        <button onClick={handleLeftDown}>Down</button>
      </div>
      <div className="musicStaff-container">
        <div className="music-staff range-selector-music-staff">
          <div className="music-box range-selector-top-ledger-line"></div>
          <div className="music-box range-selector-top-ledger-line"></div>
          <div className="music-box range-selector-top-ledger-line"></div>
          <div className="music-box range-selector-top-ledger-line"></div>

          <div className="music-box"></div>
          <div className="music-box"></div>
          <div className="music-box"></div>
          <div className="music-box"></div>

          <div className="music-box range-selector-bottom-ledger-line"></div>
          <div className="music-box range-selector-bottom-ledger-line last-bottom-ledger-line"></div>

          <div
            className="range-selector-whole-note left-whole-note"
            style={{ top: `${leftWholeNotePosition}%` }}
          >
            <div className="inner-whole-note"></div>
          </div>

          <div
            className="range-selector-whole-note right-whole-note"
            style={{ top: `${rightWholeNotePosition}%` }}
          >
            <div className="inner-whole-note"></div>
          </div>
        </div>
      </div>
      <div>
        <button onClick={handleRighttUp}>Up</button>
        <button onClick={handleRightDown}>Down</button>
      </div>
    </div>
  );
};

export default RangeSelector;
