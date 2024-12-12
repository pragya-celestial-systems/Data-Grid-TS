import React, { useEffect, useRef } from 'react';
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
import { deleteRow, setTableData } from '../store/slices/table.slice';
import { useAppDispatch } from '../store/hooks';
import jsonData from '../data.json';

export default function BasicTable() {
  const dispatch = useAppDispatch();
  const { tableData } = useTableData();
  const { filteredData, setFilteredData } = useTableData();
  const { currentPage, rows } = usePagination();
  const {
    rowsToBeDeleted,
    setRowsToBeDeleted,
    areAllSelected,
    setAreAllSelected,
  } = useRowContext();
  const tableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    dispatch(setTableData(jsonData));
  }, [jsonData]);

  useEffect(() => {
    if (areAllSelected) {
      const uniqueKeys = filteredData.map((data) => {
        return data.unique_key;
      });

      setRowsToBeDeleted(uniqueKeys);
    }
  }, [areAllSelected]);

  useEffect(() => {
    if (tableData) {
      const startIndex = currentPage * rows;
      const endIndex = startIndex + rows;
      setFilteredData(tableData.slice(startIndex, endIndex));
    }
  }, [currentPage, rows, tableData]);

  function handleDeleteRow() {
    const confirm = window.confirm(
      'Are you sure you want to delete the selected rows?'
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
          <TableBody ref={tableRef}>
            {filteredData.map((row, index) => (
              <Row key={index} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
