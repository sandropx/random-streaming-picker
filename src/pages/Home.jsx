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
        <div className="content">
          <div className="home-logo">
            <img
              src="src/assets/random-logo-icon-only.png"
              alt="Logo Random"
              className="logo-icon-only"
            />
          </div>
          <h2>Can't decide?</h2>
          <h1>We'll pick for you</h1>
          <p>
            Instead of hundreds of results, get 3 random picks tailored to your
            favorite platforms and preferences.
          </p>
          <img src="" alt="" />
          <button className="home-button" onClick={handleClick}>
            Let's go <EastIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
