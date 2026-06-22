import { Routes, Route } from "react-router";
import { useNavigate, useLocation } from "react-router";
//import { Analytics } from "@vercel/analytics/next";       <Analytics />

import Platforms from "./pages/Platforms";
import Category from "./pages/Category";
import Preference from "./pages/Preference";
import Search from "./pages/Search";
import Results from "./pages/Result";
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
