import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    platforms: [],
    preferences: [],
    categories: [],
  });

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  return useContext(FilterContext);
}
