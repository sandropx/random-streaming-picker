import { useFilters } from "../context/FilterContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import CasinoIcon from "@mui/icons-material/Casino";
import Swal from "sweetalert2";
import Nav from "./Nav";
import Card from "./Card";

function Results() {
  const { filters } = useFilters();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  async function fetchResults() {
    const hasPlatforms = filters.platforms.length > 0;
    const hasCategories = filters.categories.length > 0;
    const hasPreferences = filters.preferences.length > 0;

    if (!hasPlatforms && !hasCategories && !hasPreferences) {
      setLoading(false);

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
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_WATCHMODE_API_KEY;

      const sourceIds = filters.platforms.join(",");
      const genres = filters.categories.join(",");
      const types = filters.preferences.join(",");

      const url =
        `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}` +
        `&source_ids=${sourceIds}` +
        `&genres=${genres}` +
        `&types=${types}` +
        `&regions=CH`;

      const response = await fetch(url);

      const data = await response.json();

      const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

      const randomResults = data.titles
        .filter((movie) => !seenTitles.includes(movie.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const detailedResults = await Promise.all(
        randomResults.map(async (movie) => {
          const response = await fetch(
            `https://api.watchmode.com/v1/title/${movie.id}/details/?apiKey=${apiKey}&append_to_response=seasons,sources`,
          );

          return await response.json();
        }),
      );

      setResults(detailedResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSeen(id) {
    const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

    localStorage.setItem("seenTitles", JSON.stringify([...seenTitles, id]));

    const replacementMovie = await getReplacementMovie();

    setResults((prev) =>
      prev.map((movie) => (movie.id === id ? replacementMovie : movie)),
    );
  }

  async function getReplacementMovie() {
    const apiKey = import.meta.env.VITE_WATCHMODE_API_KEY;

    const sourceIds = filters.platforms.join(",");
    const genres = filters.categories.join(",");
    const types = filters.preferences.join(",");

    const url =
      `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}` +
      `&source_ids=${sourceIds}` +
      `&genres=${genres}` +
      `&types=${types}` +
      `&regions=CH`;

    const response = await fetch(url);
    const data = await response.json();

    const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

    const availableTitles = data.titles.filter(
      (movie) => !seenTitles.includes(movie.id),
    );

    const randomMovie =
      availableTitles[Math.floor(Math.random() * availableTitles.length)];

    const detailsResponse = await fetch(
      `https://api.watchmode.com/v1/title/${randomMovie.id}/details/?apiKey=${apiKey}&append_to_response=seasons,sources`,
    );

    return await detailsResponse.json();
  }

  return (
    <>
      <div className="content-result">
        {loading ? (
          <>
            <div className="loading">
              <div className="circle-border">
                <div className="circle-core"></div>
              </div>
            </div>
          </>
        ) : (
          results.map((result) => (
            <Card key={result.id} result={result} onSeen={handleSeen} />
          ))
        )}
        <button className="refresh-btn" onClick={fetchResults}>
          <CasinoIcon />
        </button>
      </div>
    </>
  );
}

export default Results;
