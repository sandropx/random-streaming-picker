import { useNavigate, useLocation } from "react-router";
import { useSwipeable } from "react-swipeable";

const PAGES = ["/", "/preference", "/category", "/search"];

function UseNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentIndex = PAGES.indexOf(location.pathname);

  function goNext() {
    if (currentIndex < PAGES.length - 1) {
      navigate(PAGES[currentIndex + 1]);
    }
  }

  function goPrev() {
    if (currentIndex > 0) {
      navigate(PAGES[currentIndex - 1]);
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackTouch: true,
    trackMouse: true,
  });

  return {
    goNext,
    goPrev,
    handlers,
    isFirst: currentIndex === 0,
    isLast: currentIndex === PAGES.length - 1,
  };
}

export default UseNavigation;
