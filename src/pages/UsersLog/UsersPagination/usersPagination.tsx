// Pagination.tsx
import React from "react";
import ReactPaginate from "react-paginate";
import "./usersPagination.css";

interface PaginationProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  onPageChange,
  currentPage,
}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange}
      initialPage={currentPage}
      containerClassName="pagination"
      pageClassName="pagination__item"
      activeClassName="pagination__item--active"
      previousLabel="Previous"
      nextLabel="Next"
    />
  );
};

export default Pagination;
