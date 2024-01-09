import "./landingPage.css";
import scaleUp from "../images/Frame 2.svg";
import scaleDown from "../images/Frame 16.svg";
import photographUp from "../images/photgraphUp.svg";
import photographDown from "../images/photographDown.svg";
import randomChords from "../images/Frame 19.svg";
import random from "../images/Frame 20.svg";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="content-container">
          <div className="text-container">
            <h1>
              PIANO NOTE <br /> PRACTICE
            </h1>
          </div>
          <button className="landing-page-btn">GET STARTED</button>
          <div className="image-slider-container">
            <div className="image-slider">
              <img className="landing-page-scale-img" alt="" src={scaleUp} />
              <img className="landing-page-scale-img" alt="" src={scaleDown} />
              <img className="landing-page-scale-img" alt="" src={randomChords} />
              <img className="landing-page-scale-img" alt="" src={random} />
              <img className="landing-page-scale-img" alt="" src={photographUp} />
              <img className="landing-page-scale-img" alt="" src={photographDown} />
              <img className="landing-page-scale-img" alt="" src={scaleUp} />
              <img className="landing-page-scale-img" alt="" src={scaleDown} />
              <img className="landing-page-scale-img" alt="" src={randomChords} />
              <img className="landing-page-scale-img" alt="" src={random} />
              <img className="landing-page-scale-img" alt="" src={photographUp} />
              <img className="landing-page-scale-img" alt="" src={photographDown} />
            </div>
          </div>
        </div>
        <div className="bg-image-container"></div>
      </div>
    </div>
  );
};

export default LandingPage;
