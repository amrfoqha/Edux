import Pagination from "@mui/material/Pagination";

const UsePagination = ({
  currentPage,
  setCurrentPage,
  totalItems,
  limit,
  totalPages,
}) => {
  console.log(totalPages + " " + totalItems + " " + limit);
  return (
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(e, value) => setCurrentPage(value)}
      siblingCount={1}
      boundaryCount={2}
      showFirstButton
      showLastButton
      size="large"
      variant="outlined"
      sx={{
        "& .MuiPaginationItem-root": {
          borderRadius: "12px",
          fontSize: "20px",
          margin: "0 8px",
        },
        "& .Mui-selected": {
          background:
            "linear-gradient(135deg, var(--primary), var(--secondary))",
          color: "#fff",
        },
        "& .MuiPaginationItem-root:hover": {
          background:
            "linear-gradient(135deg, var(--primary), var(--secondary))",
          color: "#fff",
        },
        "& .MuiPaginationItem-root.Mui-selected:hover": {
          background:
            "linear-gradient(135deg, var(--primary), var(--secondary))",
          color: "#fff",
        },
      }}
    />
  );
};

export default UsePagination;
