import React from "react";
import { RowProvider } from "./context/RowContext.tsx";
import { PaginationProvider } from "./context/PaginationContext.tsx";
import { TableDataProvider } from "./context/TableData.tsx";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import BasicTable from "./components/Table.tsx";
import Pagination from "./components/Pagination.tsx";

function App() {
  return (
    <Provider store={store}>
      <TableDataProvider>
        <PaginationProvider>
          <RowProvider>
            <h1 style={{ textAlign: "center", margin: "2rem" }}>
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
