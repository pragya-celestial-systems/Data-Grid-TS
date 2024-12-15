import React, { useEffect, useState } from 'react';
import { Box, TableCell } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { useTableData } from '../context/TableData';
import { usePagination } from '../context/PaginationContext';
import { useAppSelector } from '../store/hooks';

const sortTypes = ['default', 'ascending', 'descending'];

interface THeadingProps {
  index: number;
  heading: string;
  columnKey: string | number;
}

interface SortDataParams {
  [key: string]: string | number | undefined ;
}

function THeading({ index, heading, columnKey }: THeadingProps) {
  const [sort, setSort] = useState<number>(1);
  const tableData = useAppSelector((state) => state.tableData.data);
  const { currentPage, rows } = usePagination();
  const { filteredData, setFilteredData } = useTableData();
  const [filteredDataCopy, setFilteredDataCopy] = useState<SortDataParams[]>([]);

  useEffect(() => {
    if (tableData) {
      const startIndex = currentPage * rows;
      const endIndex = startIndex + rows;
      setFilteredDataCopy(tableData.slice(startIndex, endIndex));
    }
  }, [tableData, currentPage, rows]);

  function handleSortColumn(e: React.BaseSyntheticEvent) {
    setSort((prevState) => ++prevState % 3);
    const sortKey = Number(e.currentTarget.dataset.sort);
    const sortType = sortTypes[sortKey];

    // TODO
    const sortedData = [...filteredData] as SortDataParams[];

    if (sortType === 'default') {
      setFilteredData(filteredDataCopy);
      return;
    } else if (sortType === 'ascending') {
      const updatedArray = sortInAscendingOrder(sortedData);
      setFilteredData(updatedArray);
    } else if (sortType === 'descending') {
      const updatedArray = sortInDescendingOrder(sortedData);
      setFilteredData(updatedArray);
    }
  }

  function sortInAscendingOrder(dataArray: SortDataParams[]) {
    console.log(typeof dataArray);
    dataArray.sort((a, b) => {
      if (typeof a[columnKey] === 'string' && typeof b[columnKey] === 'string') {
        if (!isNaN(Number(a[columnKey])) && !isNaN(Number(b[columnKey]))) {
          return Number(a[columnKey]) - Number(b[columnKey]);
        } else {
          return a[columnKey].localeCompare(b[columnKey]);
        }
      }
      if (typeof a[columnKey] === 'number' && typeof b[columnKey] === 'number') {
        return a[columnKey] - b[columnKey];
      }
      return 0;
    });

    return dataArray;
  }

  function sortInDescendingOrder(dataArray: SortDataParams[]) {
    dataArray.sort((a, b) => {
      if (typeof a[columnKey] === 'string' && typeof b[columnKey] === 'string') {
        if (!isNaN(Number(a[columnKey])) && !isNaN(Number(b[columnKey]))) {
          return Number(b[columnKey]) - Number(a[columnKey]);
        } else {
          return b[columnKey].localeCompare(a[columnKey]);
        }
      }
      if (typeof a[columnKey] === 'number' && typeof b[columnKey] === 'number') {
        return b[columnKey] - a[columnKey];
      }
      return 0;
    });

    return dataArray;
  }

  return (
    <TableCell key={index}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: 'grey',
        }}
        data-sort={sort}
        onClick={handleSortColumn}
      >
        <SwapVertIcon sx={{ marginRight: 1 }} />
        {heading}
      </Box>
    </TableCell>
  );
}

export default THeading;
