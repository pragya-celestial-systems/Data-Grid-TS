import React, { useEffect, useState } from 'react';
import { RowProvider } from './context/RowContext';
import { PaginationProvider } from './context/PaginationContext';
import { TableDataProvider } from './context/TableData';
import BasicTable from './components/Table';
import Pagination from './components/Pagination';
import { useAppSelector } from './store/hooks';
import UploadFileForm from './components/UploadFileForm';

function App() {
  const tableData = useAppSelector((state) => state.tableData.data);
  const [hasData, setHasData] = useState<boolean>(false);

  useEffect(() => {
    if (tableData.length > 0) {
      setHasData(true);
    }
  }, [tableData]);

  return (
    <TableDataProvider>
      <PaginationProvider>
        <RowProvider>
          {hasData ? (
            <>
              <h1 style={{ textAlign: 'center', margin: '2rem' }}>
                Typescript Data Grid
              </h1>
              <BasicTable />
              <Pagination />
            </>
          ) : (
            <UploadFileForm />
          )}
          {/* <h1 style={{ textAlign: 'center', margin: '2rem' }}>
            Typescript Data Grid
          </h1>
          <BasicTable />
          <Pagination /> */}
        </RowProvider>
      </PaginationProvider>
    </TableDataProvider>
  );
}

export default App;
