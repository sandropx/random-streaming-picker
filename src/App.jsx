import { Routes, Route } from "react-router";
import { useNavigate, useLocation } from "react-router";

import Platforms from "./components/Platforms";
import Category from "./components/Category";
import Preference from "./components/Preference";
import Search from "./components/Search";
import Results from "./components/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Platforms />} />
      <Route path="/preference" element={<Preference />} />
      <Route path="/category" element={<Category />} />
      <Route path="/search" element={<Search />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;
