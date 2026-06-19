import { useFilters } from "../context/FilterContext";

import PaginationDots from "./PaginationDots";
import UseNavigation from "./UseNavigation.jsx";

function Preference() {
  const { handlers } = UseNavigation();

  const { filters, setFilters } = useFilters();

  const preferences = [
    { id: "movie", label: "Movies" },
    { id: "tv_series", label: "Series" },
    { id: "tv_miniseries", label: "Mini-Series" },
  ];

  function handleChange(id) {
    const alreadySelected = filters.preferences.includes(id);

    setFilters((prev) => ({
      ...prev,
      preferences: alreadySelected
        ? prev.preferences.filter((pref) => pref !== id)
        : [...prev.preferences, id],
    }));
  }

  return (
    <>
      <div {...handlers} className="content-box">
        <div className="content">
          <h2>Choose your</h2>
          <h1>Preference</h1>
          <div className="cat-input">
            {preferences.map((preference) => (
              <label key={preference.id}>
                <input
                  className="checkbox"
                  type="checkbox"
                  name={preference.id}
                  checked={filters.preferences.includes(preference.id)}
                  onChange={() => handleChange(preference.id)}
                />
                {preference.label}
              </label>
            ))}
          </div>
          <PaginationDots />
        </div>
      </div>
    </>
  );
}

export default Preference;
