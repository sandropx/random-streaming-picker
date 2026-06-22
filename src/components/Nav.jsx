import UseNavigation from "../hooks/UseNavigation.jsx";

function Nav() {
  const { goNext, goPrev, isFirst, isLast } = UseNavigation();

  return <div className="btn-next"></div>;
}

export default Nav;
