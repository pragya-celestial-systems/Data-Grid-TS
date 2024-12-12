import React from 'react';
import { RowProvider } from './context/RowContext';
import { PaginationProvider } from './context/PaginationContext';
import { TableDataProvider } from './context/TableData';
import { Provider } from 'react-redux';
import store from './store/store';
import BasicTable from './components/Table';
import Pagination from './components/Pagination';

function App() {
  return (
    <Provider store={store}>
      <TableDataProvider>
        <PaginationProvider>
          <RowProvider>
            <h1 style={{ textAlign: 'center', margin: '2rem' }}>
              Typescript Data Grid
            </h1>
            <BasicTable />
            <Pagination />
          </RowProvider>
        </PaginationProvider>
      </TableDataProvider>
    </Provider>
  );
}

export default App;
