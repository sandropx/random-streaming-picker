import { useLocation } from "react-router";

function PaginationDots() {
  const location = useLocation();

  const pages = ["/", "/preference", "/category", "/search"];

  const currentPage = pages.indexOf(location.pathname);

  return (
    <div className="content-dot">
      <div className="pagination-dots">
        {pages.map((_, index) => (
          <span
            key={index}
            className={currentPage === index ? "dot active" : "dot"}
          />
        ))}
      </div>
    </div>
  );
}

export default PaginationDots;
