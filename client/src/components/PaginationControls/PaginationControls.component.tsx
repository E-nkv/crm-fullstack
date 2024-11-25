import React, { useState } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  handleFirstPage: () => void;
  handleLastPage: () => void;
}

const PaginationControls: React.FC<Props> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
  handleFirstPage,
  handleLastPage,
}) => {
  return (
    <div className="flex justify-center mt-4 gap-4">
      <button onClick={handleFirstPage} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500">
        First
      </button>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        -1
      </button>
      <span className="px-4 py-2 border rounded">{currentPage + 1}</span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-500"
      >
        +1
      </button>
      <button onClick={handleLastPage} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500">
        Last
      </button>
    </div>
  );
};

export default PaginationControls;
