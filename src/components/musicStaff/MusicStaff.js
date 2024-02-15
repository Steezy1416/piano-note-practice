import "./musicStaff.css";
import trebelClef from "../../images/treble-clef-svgrepo-com.svg";
import bassClef from "../../images/bass-clef-svgrepo-com.svg"
import {trebleClefQuestions} from "./noteQuestions";

const MusicStaff = ({ currentQuestionIndex }) => {
  return (
    <div className="musicStaff-container">
      <div className="music-staff">
        <div className="music-box top-ledger-line"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box bottom-ledger-line"></div>
        <div
          style={{ top: `${trebleClefQuestions[currentQuestionIndex].position}` }}
          className="whole-note"
        >
          <div className="inner-whole-note"></div>
        </div>
        <img className="music-staff-treble-clef" alt="" src={trebelClef}></img>
        <img className="music-staff-bass-clef" alt="" src={bassClef}></img>
      </div>
    </div>
  );
};

export default MusicStaff;
