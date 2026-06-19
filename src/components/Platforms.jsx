import { useFilters } from "../context/FilterContext";
import sources from "../data/sources.json";
import UseNavigation from "./UseNavigation.jsx";
import PaginationDots from "./PaginationDots";

function Platforms() {
  const { handlers } = UseNavigation();

  const platforms = sources.filter((source) =>
    [
      "Netflix",
      "Prime Video",
      "Disney+",
      "Apple TV",
      "Paramount+",
      "Canal+",
      "HBO (Via Hulu)",
    ].includes(source.name),
  );

  const { filters, setFilters } = useFilters();

  function handleChange(id) {
    const selected = filters.platforms.includes(id);

    setFilters((prev) => ({
      ...prev,
      platforms: selected
        ? filters.platforms.filter((platform) => platform !== id)
        : [...filters.platforms, id],
    }));
  }

  return (
    <>
      <div {...handlers} className="content-box">
        <div className="content">
          <h2>Choose your</h2>
          <h1>Platform</h1>
          <div className="cat-input">
            {platforms.map((platform) => (
              <label key={platform.id}>
                <input
                  className="checkbox"
                  type="checkbox"
                  name={platform.id}
                  checked={filters.platforms.includes(platform.id)}
                  onChange={() => handleChange(platform.id)}
                />
                {platform.name === "HBO (Via Hulu)" ? "HBO" : platform.name}
              </label>
            ))}
          </div>
          <PaginationDots />
        </div>
      </div>
    </>
  );
}

export default Platforms;
