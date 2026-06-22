import { useState } from "react";
import Swal from "sweetalert2";
function useResults(filters, navigate) {
  const apiKey = import.meta.env.VITE_WATCHMODE_API_KEY;

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyReason, setEmptyReason] = useState(null);
  const [totalTitles, setTotalTitles] = useState(0);

  function buildUrl() {
    const sourceIds = filters.platforms.join(",");
    const genres = filters.categories.join(",");
    const types = filters.preferences.join(",");

    return (
      `https://api.watchmode.com/v1/list-titles/?apiKey=${apiKey}` +
      `&source_ids=${sourceIds}` +
      `&genres=${genres}` +
      `&types=${types}` +
      `&regions=CH`
    );
  }
  console.log(buildUrl());

  async function fetchResults() {
    setLoading(true);
    setEmptyReason(null);
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
      const response = await fetch(buildUrl());

      const data = await response.json();

      setTotalTitles(data.titles?.length || 0);

      if (!data.titles || data.titles.length === 0) {
        setEmptyReason("filters");
        setResults([]);
        return;
      }

      const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

      const randomResults = data.titles
        .filter((movie) => !seenTitles.includes(movie.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      console.log("API:", data.titles.length);
      console.log("SEEN:", seenTitles.length);
      console.log("RANDOM:", randomResults.length);

      if (randomResults.length === 0) {
        setEmptyReason("history");
        setResults([]);
        return;
      }

      const detailedResults = await Promise.all(
        randomResults.map(async (movie) => {
          const response = await fetch(
            `https://api.watchmode.com/v1/title/${movie.id}/details/?apiKey=${apiKey}&append_to_response=seasons,sources`,
          );

          return await response.json();
        }),
      );
      setEmptyReason(null);
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
    const response = await fetch(buildUrl());

    const data = await response.json();

    const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

    const availableTitles = data.titles.filter(
      (movie) => !seenTitles.includes(movie.id),
    );

    if (availableTitles.length === 0) {
      setEmptyReason("history");
      setResults([]);
      return;
    }

    const randomMovie =
      availableTitles[Math.floor(Math.random() * availableTitles.length)];

    const detailsResponse = await fetch(
      `https://api.watchmode.com/v1/title/${randomMovie.id}/details/?apiKey=${apiKey}&append_to_response=seasons,sources`,
    );

    return await detailsResponse.json();
  }
  console.log("EMPTY REASON:", emptyReason);
  return {
    results,
    loading,
    emptyReason,
    totalTitles,
    fetchResults,
    handleSeen,
  };
}

export default useResults;
