import "./musicStaff.css";
import trebelClef from "../../images/treble-clef-svgrepo-com.svg";
import bassClef from "../../images/bass-clef-svgrepo-com.svg";

const MusicStaff = ({ currentQuestionIndex, currentQuestions }) => {
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
        <div
          style={{ top: `${currentQuestions[currentQuestionIndex].position}` }}
          className="whole-note"
        >
          <div className="inner-whole-note"></div>
        </div>
        {currentQuestions[currentQuestionIndex].clefClass === "treble" ? (
          <img
            className="music-staff-treble-clef"
            alt=""
            src={trebelClef}
          ></img>
        ) : (
          <img className="music-staff-bass-clef" alt="" src={bassClef}></img>
        )}
      </div>
    </div>
  );
};

export default MusicStaff;
