import React, { createContext, useContext, useState } from 'react';

interface Pagination {
  currentPage: number;
  setCurrentPage: (num: number) => void;
  rows: number;
  setRows: (count: number) => void;
  isFiltering: boolean;
  setIsFiltering: (isFiltering: boolean) => void;
}

interface PaginationContextProvider {
  children: React.ReactNode;
}

const paginationContext = createContext<Pagination | undefined>(undefined);

export function PaginationProvider({ children }: PaginationContextProvider) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rows, setRows] = useState<number>(10);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  return (
    <paginationContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        rows,
        setRows,
        isFiltering,
        setIsFiltering,
      }}
    >
      {children}
    </paginationContext.Provider>
  );
}

export function usePagination() {
  const pagination = useContext(paginationContext);

  if (!pagination) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }

  return pagination;
}
