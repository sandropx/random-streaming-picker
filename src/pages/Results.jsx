import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCards, Scrollbar } from "swiper/modules";

import { useFilters } from "../context/FilterContext";
import useResults from "../hooks/useResults";
import Swal from "sweetalert2";

import ShuffleIcon from "@mui/icons-material/Shuffle";
import WarningAmberSharpIcon from "@mui/icons-material/WarningAmberSharp";

import Card from "../components/Card";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Results() {
  const { filters } = useFilters();
  const navigate = useNavigate();
  const {
    results,
    loading,
    emptyReason,
    totalTitles,
    allMinusSeen,
    apiRemaining,
    fetchResults,
    handleSeen,
    shuffleFromPool,
  } = useResults(filters, navigate);

  console.log("API remaining:", apiRemaining);

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
        <Swiper
          modules={[Pagination, EffectCards, Scrollbar]}
          pagination={{
            clickable: false,
            type: "bullets",
            dynamicBullets: false,
          }}
          scrollbar={{ draggable: false }}
          effect="cards"
          speed={400}
          cardsEffect={{
            slideShadows: false,
            rotate: 0,
            perSlideOffset: 10,
            perSlideRotate: 0,
          }}
        >
          {results.map((result) => (
            <SwiperSlide key={result.id}>
              <Card result={result} onSeen={handleSeen} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!loading && !emptyReason && (
        <>
          {/*<div className="text-center pb-5">
            <i>{allMinusSeen} titles found</i>
          </div>*/}

          <button className="refresh-btn" onClick={shuffleFromPool}>
            <ShuffleIcon fontSize="large" />
          </button>
        </>
      )}
    </div>
  );
}

export default Results;
