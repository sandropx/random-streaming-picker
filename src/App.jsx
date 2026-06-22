import { Routes, Route } from "react-router";
import { useNavigate, useLocation } from "react-router";
//import { Analytics } from "@vercel/analytics/next";       <Analytics />

import Platforms from "./pages/Platforms.jsx";
import Category from "./pages/Category.jsx";
import Preference from "./pages/Preference.jsx";
import Search from "./pages/Search.jsx";
import Results from "./pages/Results.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Platforms />} />
        <Route path="/preference" element={<Preference />} />
        <Route path="/category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </>
  );
}

export default App;
