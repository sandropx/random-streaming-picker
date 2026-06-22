import UseNavigation from "../hooks/UseNavigation";

function Nav() {
  const { goNext, goPrev, isFirst, isLast } = UseNavigation();

  return <div className="btn-next"></div>;
}

export default Nav;
