import { useFilters } from "../context/FilterContext";

import StarIcon from "@mui/icons-material/Star";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Card({ result, onSeen }) {
  const { filters } = useFilters();

  const typeLabels = {
    movie: "Movie",
    tv_series: "Series",
    tv_miniseries: "Mini-Series",
    tv_special: "TV Special",
    short_film: "Short Film",
    tv_movie: "TV Movie",
  };

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    return `${hours}h${String(mins).padStart(2, "0")}`;
  }

  const infos = [result.year, typeLabels[result.type] || result.type];
  if (result.type === "movie") {
    infos.push(formatRuntime(result.runtime_minutes));
  }

  if (
    (result.type === "tv_series" || result.type === "tv_miniseries") &&
    result.seasons?.length > 0
  ) {
    infos.push(
      `${result.seasons.length} ${
        result.seasons.length > 1 ? "Seasons" : "Season"
      }`,
    );
  }

  const selectedGenres = result.genre_names.filter((genre, index) =>
    filters.categories.includes(result.genres[index]),
  );

  const displayGenres = [
    ...selectedGenres,
    ...result.genre_names.filter((genre) => !selectedGenres.includes(genre)),
  ].slice(0, 3);

  const matchingSource = filters.platforms
    .map((id) => result.sources?.find((source) => source.source_id === id))
    .find(Boolean);

  console.log(result.sources);
  return (
    <>
      <div className="card">
        <button className="button-seen" onClick={() => onSeen(result.id)}>
          <VisibilityOffIcon />
        </button>
        <div className="poster">
          <img
            src={result.posterMedium}
            alt={result.title}
            className="card-img"
          />
        </div>
        <div className="general-card">
          <div className="header-card">
            <div>
              <span className="meta">{infos.join(" • ")}</span>
              <h3>{result.title}</h3>
            </div>
            <div className="rating">
              <StarIcon /> {result.user_rating}
            </div>
          </div>
          <hr />
          <p className="plot-overview">{result.plot_overview}</p>
          <div className="tags">
            <span className="genres">{displayGenres.join(" • ")}</span>
            <span className="platform">{matchingSource?.name}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
