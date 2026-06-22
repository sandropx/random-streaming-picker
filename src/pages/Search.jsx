import { useFilters } from "../context/FilterContext.jsx";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";

import Swal from "sweetalert2";
import UseNavigation from "../hooks/UseNavigation";
import PaginationDots from "../components/PaginationDots";

function Search() {
  const { handlers } = UseNavigation();

  const navigate = useNavigate();

  async function handleClick() {
    if (isDisabled) {
      await Swal.fire({
        title: "Missing filters",
        text: "Please select at least one filter.",
        confirmButtonText: "Go back",
        icon: "warning",
        customClass: {
          container: "my-alert-container",
          popup: "my-alert",
          title: "my-alert-title",
          confirmButton: "my-alert-btn",
        },
      });

      navigate("/");
      return;
    }

    navigate("/results");
  }

  const { filters } = useFilters();

  const isDisabled =
    filters.platforms.length === 0 &&
    filters.categories.length === 0 &&
    filters.preferences.length === 0;

  return (
    <>
      <div {...handlers} className="m-0 search-page">
        <button
          onClick={handleClick}
          className={`search-button ${isDisabled ? "disabled" : ""}`}
        >
          Search
        </button>
        <PaginationDots />
      </div>
    </>
  );
}

export default Search;
