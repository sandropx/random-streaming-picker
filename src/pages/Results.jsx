import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useFilters } from "../context/FilterContext";
import useResults from "../hooks/useResults";

import ShuffleIcon from "@mui/icons-material/Shuffle";

import Card from "../components/Card";
import Loading from "../components/Loading";

function Results() {
  const { filters } = useFilters();
  const navigate = useNavigate();
  const {
    results,
    loading,
    emptyReason,
    totalTitles,
    fetchResults,
    handleSeen,
  } = useResults(filters, navigate);

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <>
      <div className="content-result">
        <div className="text-center pt-5">
          <i>{totalTitles} titles found • Showing 3 random picks</i>
        </div>
        {loading ? (
          <Loading />
        ) : emptyReason === "filters" ? (
          <div className="empty-state">
            <h2>No titles found</h2>
            <p>There are no movies or series matching these filters.</p>
            <p>Try a different combination.</p>
            <button onClick={() => navigate("/")}>Go back</button>
          </div>
        ) : emptyReason === "history" ? (
          <div className="empty-state">
            <h2>You've seen everything!</h2>
            <p>You've already seen all matching titles.</p>
            <button
              onClick={() => {
                localStorage.removeItem("seenTitles");
                fetchResults();
              }}
            >
              Reset History
            </button>
          </div>
        ) : (
          results.map((result) => (
            <Card key={result.id} result={result} onSeen={handleSeen} />
          ))
        )}
        {!loading && !emptyReason && (
          <button className="refresh-btn" onClick={fetchResults}>
            <ShuffleIcon fontSize="large" />
          </button>
        )}
      </div>
    </>
  );
}

export default Results;
