function EmptyState({ type, onReset, onBack }) {
  if (type === "filters") {
    return (
      <div className="empty-state">
        <h2>No titles found</h2>
        <p>There are no movies or series matching these filters.</p>
        <button onClick={onBack}>Go back</button>
      </div>
    );
  }

  if (type === "history") {
    return (
      <div className="empty-state">
        <h2>You've seen everything!</h2>
        <button onClick={onReset}>Reset History</button>
      </div>
    );
  }

  return null;
}

export default EmptyState;
