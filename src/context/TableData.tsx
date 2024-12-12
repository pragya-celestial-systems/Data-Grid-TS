import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAppSelector } from '../store/hooks';

interface TableData {
  filteredData: object[];
  setFilteredData: Dispatch<SetStateAction<object[]>>;
  tableData: object[];
  setTableData: Dispatch<SetStateAction<object[]>>;
}

interface TableProviderInterface {
  children: React.ReactNode;
}

const dataContext = createContext<TableData | undefined>(undefined);

export function TableDataProvider({ children }: TableProviderInterface) {
  const [filteredData, setFilteredData] = useState<object[]>([]);
  const [tableData, setTableData] = useState<object[]>([]);
  const data = useAppSelector((state) => state.tableData.data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <>
      <dataContext.Provider
        value={{ filteredData, setFilteredData, tableData, setTableData }}
      >
        {children}
      </dataContext.Provider>
    </>
  );
}

export function useTableData() {
  const tableContext = useContext(dataContext);

  if (!tableContext) {
    throw new Error(
      'useTableContext must be used only inside the TableDataProvider.', 
    );
  }

  return tableContext;
}
