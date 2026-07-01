import { Routes, Route } from "react-router";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";

//import { Analytics } from "@vercel/analytics/next";       <Analytics />

import DesktopMessage from "./components/DesktopMessage";

import Home from "./pages/Home";
import Platforms from "./pages/Platforms";
import Category from "./pages/Category";
import Preference from "./pages/Preference";
import Search from "./pages/Search";
import Results from "./pages/Results";

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth >= 768);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isDesktop) {
    return <DesktopMessage />;
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
