import "./musicStaff.css";
import trebelClef from "../../images/treble-clef-svgrepo-com.svg";
import bassClef from "../../images/bass-clef-svgrepo-com.svg";

const MusicStaff = ({ currentQuestionIndex, currentQuestions }) => {
  let notePosition = currentQuestions[currentQuestionIndex].position;
  let currentQuestionsClefClass =
    currentQuestions[currentQuestionIndex].clefClass;

  return (
    <div className="musicStaff-container">
      <div className="music-staff">
        <div className="music-box top-ledger-line"></div>
        <div className="music-box top-ledger-line"></div>
        <div className="music-box top-ledger-line"></div>
        <div className="music-box top-ledger-line"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box bottom-ledger-line"></div>
        <div className="music-box bottom-ledger-line last-bottom-ledger-line"></div>
        <div style={{ top: `${notePosition}` }} className="whole-note">
          <div className="inner-whole-note"></div>
        </div>
        {currentQuestionsClefClass === "treble" ? (
          <img className="music-staff-treble-clef" alt="" src={trebelClef} />
        ) : (
          <img className="music-staff-bass-clef" alt="" src={bassClef} />
        )}
      </div>
    </div>
  );
};

export default MusicStaff;
