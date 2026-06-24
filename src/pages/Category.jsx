import { useFilters } from "../context/FilterContext";

import genres from "../data/genres";
import UseNavigation from "../hooks/UseNavigation";

import Nav from "../components/Nav";

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
          <Nav />
        </div>
      </div>
    </>
  );
}

export default Category;
