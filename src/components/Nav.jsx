import { useNavigate, useLocation } from "react-router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  const pages = ["/", "/platforms", "/preference", "/category", "/search"];

  const currentIndex = pages.indexOf(location.pathname);

  const previousPage = currentIndex > 0 ? pages[currentIndex - 1] : null;

  const nextPage =
    currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  return (
    <div className="content-nav">
      <div className="nav-arrows">
        <button disabled={!previousPage} onClick={() => navigate(previousPage)}>
          <ChevronLeftIcon fontSize="large" />
        </button>

        <button disabled={!nextPage} onClick={() => navigate(nextPage)}>
          <ChevronRightIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default Nav;
