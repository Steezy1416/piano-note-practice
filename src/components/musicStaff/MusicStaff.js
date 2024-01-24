import "./musicStaff.css";
import trebelClef from "../../images/treble-clef-svgrepo-com.svg";

const MusicStaff = () => {
  return (
    <div className="musicStaff-container">
      <div className="music-staff">
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box"></div>
        <div className="music-box middle-c"></div>
        <div className="whole-note">
          <div className="inner-whole-note"></div>
        </div>
        <img className="music-staff-treble-clef" alt="" src={trebelClef}></img>
      </div>
    </div>
  );
};

export default MusicStaff;
