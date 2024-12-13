import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { usePagination } from '../context/PaginationContext';
import { useTableData } from '../context/TableData';
import { useAppSelector } from '../store/hooks';

export default function TablePaginationDemo() {
  const { currentPage, setCurrentPage, rows, setRows, isFiltering } =
    usePagination();
  const data = useAppSelector((state) => state.tableData.data);
  const { tableData } = useTableData();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.BaseSyntheticEvent) => {
    setRows(parseInt(event.target.value));
    setCurrentPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={isFiltering ? tableData.length : data.length}
      page={currentPage}
      onPageChange={handleChangePage}
      rowsPerPage={rows}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
