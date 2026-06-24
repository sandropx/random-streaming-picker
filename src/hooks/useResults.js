import { useState } from "react";
import Swal from "sweetalert2";
function useResults(filters, navigate) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyReason, setEmptyReason] = useState(null);
  const [totalTitles, setTotalTitles] = useState(0);
  const [apiRemaining, setApiRemaining] = useState(null);

  function buildUrl() {
    const sourceIds = filters.platforms.join(",");
    const genres = filters.categories.join(",");
    const types = filters.preferences.join(",");

    return (
      `/api/watchmode` +
      `&source_ids=${sourceIds}` +
      `&genres=${genres}` +
      `&types=${types}` +
      `&regions=CH`
    );
  }

  async function fetchResults() {
    const remaining = Number(localStorage.getItem("watchmodeRemaining"));

    if (remaining && remaining <= 0) {
      await Swal.fire({
        title: "API limit reached",
        text: "The service has reached its monthly quota. Please contact developer.",
        confirmButtonText: "Go back",
        icon: "error",
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

      const quota = Number(response.headers.get("X-Account-Quota"));
      const used = Number(response.headers.get("X-Account-Quota-Used"));
      const remaining = quota - used;
      setApiRemaining(remaining);
      localStorage.setItem("watchmodeRemaining", remaining);

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

      if (randomResults.length === 0) {
        setEmptyReason("history");
        setResults([]);
        return;
      }

      const detailedResults = await Promise.all(
        randomResults.map(async (movie) => {
          const response = await fetch(`/api/details?id=${movie.id}`);

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

    if (!replacementMovie) {
      setResults((prev) => {
        const newResults = prev.filter((movie) => movie.id !== id);

        if (newResults.length === 0) {
          setEmptyReason("history");
        }

        return newResults;
      });

      return;
    }

    setResults((prev) =>
      prev.map((movie) => (movie.id === id ? replacementMovie : movie)),
    );
  }

  async function getReplacementMovie() {
    const currentIds = results.map((movie) => movie.id);

    const response = await fetch(buildUrl());
    const data = await response.json();

    const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

    const availableTitles = data.titles.filter(
      (movie) =>
        !seenTitles.includes(movie.id) && !currentIds.includes(movie.id),
    );

    if (availableTitles.length === 0) {
      return null;
    }

    const randomMovie =
      availableTitles[Math.floor(Math.random() * availableTitles.length)];

    const detailsResponse = await fetch(`/api/details?id=${randomMovie.id}`);

    return await detailsResponse.json();
  }

  const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];
  const allMinusSeen = totalTitles - seenTitles.length;

  return {
    results,
    loading,
    emptyReason,
    totalTitles,
    allMinusSeen,
    apiRemaining,
    fetchResults,
    handleSeen,
  };
}

export default useResults;
