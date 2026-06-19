import { useFilters } from "../context/FilterContext";
import genres from "../data/genres.json";
import UseNavigation from "./UseNavigation.jsx";
import PaginationDots from "./PaginationDots";

function Category() {
  const { handlers } = UseNavigation();

  const { filters, setFilters } = useFilters();

  function handleChange(id) {
    const alreadySelected = filters.categories.includes(id);

    setFilters((prev) => ({
      ...prev,

      categories: alreadySelected
        ? filters.categories.filter((category) => category !== id)
        : [...filters.categories, id],
    }));
  }

  return (
    <>
      <div {...handlers} className="content-box">
        <div className="content">
          <h2>Choose your</h2>
          <h1>Category</h1>
          <div className="cat-input">
            {genres.map((genre) => (
              <label key={genre.id}>
                <input
                  className="checkbox"
                  type="checkbox"
                  name={genre.id}
                  checked={filters.categories.includes(genre.id)}
                  onChange={() => handleChange(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>
          <PaginationDots />
        </div>
      </div>
    </>
  );
}

export default Category;
