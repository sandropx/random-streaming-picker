import { useState } from "react";
import Swal from "sweetalert2";

function useResults(filters, navigate) {
  const [results, setResults] = useState([]);
  const [titlePool, setTitlePool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyReason, setEmptyReason] = useState(null);
  const [totalTitles, setTotalTitles] = useState(0);
  const [apiRemaining, setApiRemaining] = useState(null);

  function buildUrl() {
    const sourceIds = filters.platforms.join(",");
    const genres = filters.categories.join(",");
    const types = filters.preferences.join(",");

    return (
      `/api/watchmode?source_ids=${sourceIds}` +
      `&genres=${genres}` +
      `&types=${types}` +
      `&regions=CH`
    );
  }

  async function fetchMovieDetails(movieId) {
    const response = await fetch(`/api/details?id=${movieId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    return await response.json();
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
    setEmptyReason(null);

    try {
      const response = await fetch(buildUrl());

      if (!response.ok) {
        const text = await response.text();
        console.error("Watchmode error:", response.status, text);
        throw new Error("Watchmode request failed");
      }

      const remaining = Number(
        response.headers.get("X-Account-Quota-Remaining"),
      );

      if (!Number.isNaN(remaining)) {
        setApiRemaining(remaining);
        localStorage.setItem("watchmodeRemaining", remaining);
      }

      const data = await response.json();

      setTotalTitles(data.titles?.length || 0);

      if (!data.titles || data.titles.length === 0) {
        setEmptyReason("filters");
        setResults([]);
        setTitlePool([]);
        return;
      }

      const seenTitles = JSON.parse(localStorage.getItem("seenTitles")) || [];

      const availableTitles = data.titles
        .filter((movie) => !seenTitles.includes(movie.id))
        .sort(() => Math.random() - 0.5);

      if (availableTitles.length === 0) {
        setEmptyReason("history");
        setResults([]);
        setTitlePool([]);
        return;
      }

      const firstResults = availableTitles.slice(0, 3);
      const pool = availableTitles.slice(3, 50);

      const detailedResults = await Promise.all(
        firstResults.map((movie) => fetchMovieDetails(movie.id)),
      );

      setResults(detailedResults);
      setTitlePool(pool);
      setEmptyReason(null);
    } catch (error) {
      console.error(error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function getReplacementMovie() {
    if (titlePool.length === 0) {
      return null;
    }

    const nextMovie = titlePool[0];
    setTitlePool((prev) => prev.slice(1));

    return await fetchMovieDetails(nextMovie.id);
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

  async function shuffleFromPool() {
    if (titlePool.length < 3) {
      await fetchResults();
      return;
    }

    setLoading(true);

    try {
      const nextResults = titlePool.slice(0, 3);
      const newPool = titlePool.slice(3);

      const detailedResults = await Promise.all(
        nextResults.map((movie) => fetchMovieDetails(movie.id)),
      );

      setResults(detailedResults);
      setTitlePool(newPool);
      setEmptyReason(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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
    shuffleFromPool,
  };
}

export default useResults;
