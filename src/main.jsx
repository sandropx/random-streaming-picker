import { StrictMode } from "react";
import { FilterProvider } from "./context/FilterContext";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { registerSW } from "virtual:pwa-register";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

registerSW({
  immediate: true,
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FilterProvider>
      <App />
    </FilterProvider>
  </BrowserRouter>,
);
