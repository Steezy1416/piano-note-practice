import "./landingPage.css"
import scaleUp from "../images/Frame 2.svg"
import scaleDown from "../images/Frame 16.svg"

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div className="max-width-wrapper">
          <div className="text-container">
            <h1>PIANO NOTE <br/> PRACTICE</h1>
          </div>
          <button>GET STARTED</button>
          <div className="image-slider-container">
          <div className="image-slider">
            <img className="landing-page-scale-img" alt="" src={scaleUp}/>
            <img className="landing-page-scale-img" alt="" src={scaleDown}/>
          </div>
          <div className="image-slider">
            <img className="landing-page-scale-img" alt="" src={scaleUp}/>
            <img className="landing-page-scale-img" alt="" src={scaleDown}/>
          </div>
          <div className="image-slider">
            <img className="landing-page-scale-img" alt="" src={scaleUp}/>
            <img className="landing-page-scale-img" alt="" src={scaleDown}/>
          </div>
          </div>
        </div>
      </div>
      <div className="bg-image-container"></div>
    </div>
  );
};

export default LandingPage
