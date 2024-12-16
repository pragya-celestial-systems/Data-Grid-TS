import React, { useEffect } from 'react';
import TableHeadings from './TableHeadings';
import Row from './Row';
import { useTableData } from '../context/TableData';
import { usePagination } from '../context/PaginationContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import DeleteButton from './DeleteButton';
import { useRowContext } from '../context/RowContext';
import { deleteRow } from '../store/slices/table.slice';
import { useAppDispatch } from '../store/hooks';

interface TableData {
  unique_key: string | number;
  [key: string]: string | number;
}

export default function BasicTable() {
  const dispatch = useAppDispatch();
  const { tableData, filteredData, setFilteredData } = useTableData() as {
    tableData: TableData[];
    filteredData: TableData[];
    setFilteredData: (data: TableData[]) => void;
  };
  const { currentPage, rows } = usePagination();
  const {
    rowsToBeDeleted,
    setRowsToBeDeleted,
    areAllSelected,
    setAreAllSelected,
  } = useRowContext();

  useEffect(() => {
    if (areAllSelected) {
      const uniqueKeys = filteredData.map(
        (data: TableData): string | number => data.unique_key,
      );

      setRowsToBeDeleted(uniqueKeys);
    }
  }, [areAllSelected, filteredData, setRowsToBeDeleted]);

  useEffect(() => {
    if (tableData) {
      const startIndex = currentPage * rows;
      const endIndex = startIndex + rows;
      setFilteredData(tableData.slice(startIndex, endIndex));
    }
  }, [currentPage, rows, tableData, setFilteredData]);

  function handleDeleteRow() {
    const confirm = window.confirm(
      'Are you sure you want to delete the selected rows?',
    );

    if (!confirm) return;

    dispatch(deleteRow({ rows: rowsToBeDeleted }));
    setRowsToBeDeleted([]);
    setAreAllSelected(false);
  }

  return (
    <>
      {rowsToBeDeleted.length > 0 && (
        <DeleteButton onDelete={handleDeleteRow} />
      )}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableHeadings headings={filteredData[0]} />
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <Row key={index} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
