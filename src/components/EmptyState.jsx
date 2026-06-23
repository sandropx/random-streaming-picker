import SearchIcon from "@mui/icons-material/Search";
import MovieCreationSharpIcon from "@mui/icons-material/MovieCreationSharp";

function EmptyState({ type, onReset, onBack }) {
  if (type === "filters") {
    return (
      <div className="empty-state">
        <SearchIcon fontSize="large" className="empty-icon" />
        <h3>No titles found</h3>
        <p>No movies or series match your current filters.</p>
        <div className="button-history">
          <button className="resetHistory-button" onClick={onBack}>
            Modify filters
          </button>
        </div>
      </div>
    );
  }

  if (type === "history") {
    return (
      <div className="empty-state">
        <MovieCreationSharpIcon fontSize="large" className="empty-icon" />
        <h3>You've seen everything</h3>
        <p>There are no more titles matching your filters.</p>
        <div className="button-history">
          <button className="resetHistory-button" onClick={onReset}>
            Reset History
          </button>
          <button className="changeFilter-button" onClick={onBack}>
            Change filters
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default EmptyState;
