import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useFilters } from "../context/FilterContext";
import useResults from "../hooks/useResults";

import ShuffleIcon from "@mui/icons-material/Shuffle";

import Card from "../components/Card";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

function Results() {
  const { filters } = useFilters();
  const navigate = useNavigate();
  const {
    results,
    loading,
    emptyReason,
    totalTitles,
    allMinusSeen,
    fetchResults,
    handleSeen,
  } = useResults(filters, navigate);

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="content-result">
      {loading ? (
        <Loading />
      ) : emptyReason ? (
        <EmptyState
          type={emptyReason}
          onBack={() => navigate("/")}
          onReset={() => {
            localStorage.removeItem("seenTitles");
            fetchResults();
          }}
        />
      ) : (
        results.map((result) => (
          <Card key={result.id} result={result} onSeen={handleSeen} />
        ))
      )}
      {!loading && !emptyReason && (
        <>
          <div className="text-center pb-5">
            <i>{allMinusSeen} titles found</i>
          </div>

          <button className="refresh-btn" onClick={fetchResults}>
            <ShuffleIcon fontSize="large" />
          </button>
        </>
      )}
    </div>
  );
}

export default Results;
