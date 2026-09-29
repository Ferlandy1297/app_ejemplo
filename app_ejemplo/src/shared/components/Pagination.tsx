'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) => {
  if (totalPages <= 1) return null;

  // Genera rango de páginas visibles (máx 5 botones)
  const getPageRange = () => {
    const delta = 2;
    const range: (number | '...')[] = [];
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);

    if (left > 1) {
      range.push(1);
      if (left > 2) range.push('...');
    }

    for (let i = left; i <= right; i++) range.push(i);

    if (right < totalPages) {
      if (right < totalPages - 1) range.push('...');
      range.push(totalPages);
    }

    return range;
  };

  const from = itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null;
  const to = itemsPerPage && totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
      {/* Info de registros */}
      {from !== null && to !== null && totalItems !== undefined && (
        <p className="text-xs text-slate-500">
          Mostrando <span className="font-semibold text-slate-700">{from}–{to}</span> de{' '}
          <span className="font-semibold text-slate-700">{totalItems}</span> registros
        </p>
      )}

      {/* Controles de paginación */}
      <div className="flex items-center space-x-1">
        {/* Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Números de página */}
        {getPageRange().map((page, idx) =>
          page === '...' ? (
            <span key={`dots-${idx}`} className="px-2 text-slate-400 text-xs select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`w-8 h-8 text-xs font-semibold rounded-lg transition-all ${
                currentPage === page
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
