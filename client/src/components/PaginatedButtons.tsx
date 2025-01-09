import React from 'react';

import { AppButton } from './ui/AppButton';

interface PaginationButtonsProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);
  const DELTA = 2;

  const getVisiblePages = () => {
    if (totalPages <= 1) return [1];

    const range = [1];
    const rangeWithDots: (number | string)[] = [];
    let lastNumber: number | null = null;

    // Add page numbers around current page
    for (let i = currentPage - DELTA; i <= currentPage + DELTA; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }
    range.push(totalPages);

    // Add dots between numbers if needed
    range.forEach((currentNumber) => {
      if (lastNumber) {
        if (currentNumber - lastNumber === 2) {
          rangeWithDots.push(lastNumber + 1);
        } else if (currentNumber - lastNumber > 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(currentNumber);
      lastNumber = currentNumber;
    });

    return rangeWithDots;
  };

  const handlePageClick = (pageNumber: number | string) => {
    if (typeof pageNumber === 'number') {
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex justify-center overflow-x-auto">
      {getVisiblePages().map((pageNumber, index) => (
        <AppButton
          key={index}
          onClick={() => handlePageClick(pageNumber)}
          className={`m-1 text-base text-slate-300 hover:text-general-pink-hover ${currentPage === pageNumber ? "text-general-pink": ""}`}
        >
          {pageNumber}
        </AppButton>
      ))}
    </div>
  );
};

export default PaginationButtons;
