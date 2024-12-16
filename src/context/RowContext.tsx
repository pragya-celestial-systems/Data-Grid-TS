import React, { createContext, useContext, useState } from 'react';

interface TableContextProviderProps {
  children: React.ReactNode;
}

interface TableContextProps {
  rowsToBeDeleted: (string | number)[];
  // Question : 
  setRowsToBeDeleted: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  areAllSelected: boolean;
  setAreAllSelected: (isSelected: boolean) => void;
}

const rowContext = createContext<TableContextProps | undefined>(undefined);

export function RowProvider({ children }: TableContextProviderProps) {
  const [rowsToBeDeleted, setRowsToBeDeleted] = useState<(string|number)[]>([]);
  const [areAllSelected, setAreAllSelected] = useState<boolean>(false);

  return (
    <rowContext.Provider
      value={{
        rowsToBeDeleted,
        setRowsToBeDeleted,
        areAllSelected,
        setAreAllSelected,
      }}
    >
      {children}
    </rowContext.Provider>
  );
}

export function useRowContext() {
  const context = useContext(rowContext);

  if (!context) {
    throw new Error('usePagination must be used within a PaginationProvider');
  }

  return context;
}
