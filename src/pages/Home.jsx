import { useNavigate, useLocation } from "react-router";

import EastIcon from "@mui/icons-material/East";

import randomLogo from "../assets/random-logo-icon-only.png";
import randomHero from "../assets/result.png";

function Home() {
  const navigate = useNavigate();

  async function handleClick() {
    navigate("/platforms");
  }

  return (
    <>
      <div className="content-box">
        <div className="home-content">
          <div className="margin">
            <div className="home-logo mb-2">
              <img
                alt="Logo Random"
                className="logo-icon-only"
                src={randomLogo}
              />
            </div>
            <h2>Can't decide?</h2>
            <h1>We'll pick for you</h1>
            <p>
              Instead of hundreds of results, get 3 random picks tailored to
              your favorite platforms and preferences.
            </p>
          </div>
          <div className="box-exemple">
            <img
              src={randomHero}
              alt="Exemple of result"
              className="result-exemple"
            />
          </div>
          <div className="margin">
            <button className="home-button" onClick={handleClick}>
              Let's go <EastIcon className="home-button-icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
