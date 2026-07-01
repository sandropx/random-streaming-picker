import { useNavigate, useLocation } from "react-router";

import EastIcon from "@mui/icons-material/East";
function Home() {
  const navigate = useNavigate();

  async function handleClick() {
    navigate("/platforms");
  }

  return (
    <>
      <div className="content-box">
        <div className="home-content">
          <div class="home-logo">
            <h2>Can't decide?</h2>
            <img
              alt="Logo Random"
              class="logo-icon-only"
              src="src/assets/random-logo-icon-only.png"
            />
          </div>
          <h1>We'll pick for you</h1>
          <p>
            Instead of hundreds of results, get 3 random picks tailored to your
            favorite platforms and preferences.
          </p>
          <img
            src="src/assets/result.png"
            alt="Exemple of result"
            className="result-exemple"
          />
          <button className="home-button" onClick={handleClick}>
            Let's go <EastIcon className="home-button-icon" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
