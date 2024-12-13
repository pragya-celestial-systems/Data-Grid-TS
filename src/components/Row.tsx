import React, { useEffect, useState } from 'react';
import Column from './Column';
import { Checkbox } from '@mui/material';
import { useRowContext } from '../context/RowContext';
import { makeStyles } from '@mui/styles';

const useRowStyles = makeStyles({
  tableRow: {
    '&:hover': {
      backgroundColor: 'whitesmoke',
      cursor: 'pointer',
      transition: '0.3s',
    },
  },
  activeRow: {
    background: 'whitesmoke',
  },
});

interface RowProps {
  data : {
    [key: string]: string | number;
  }
}

function Row({ data }: RowProps) {
  const classes = useRowStyles();
  const [rowData, setRowData] = useState<(string | number)[]>([]);
  const { rowsToBeDeleted, setRowsToBeDeleted } = useRowContext();

  useEffect(() => {
    if (data) {
      // Extract values excluding the last key
      const dataArray = Object.values(data);
      const updatedDataArray = dataArray.slice(0, dataArray.length - 1);
      setRowData(updatedDataArray);
    }
  }, [data]);

  function handleCheck(key: string | number) {
    if (rowsToBeDeleted.includes(String(key))) {
      setRowsToBeDeleted(rowsToBeDeleted.filter((item : string): boolean => item !== key));
    } else {
      setRowsToBeDeleted([...rowsToBeDeleted, String(key)]);
    }
  }

  return (
    <tr data-row-index={data.unique_key} className={classes.tableRow}>
      <td>
        <Checkbox
          onChange={() => handleCheck(data.unique_key)}
          checked={rowsToBeDeleted.includes(String(data.unique_key))}
        />
      </td>
      {rowData.map((value: string | number, index: number) => (
        <Column
          value={value}
          key={index}
          tableClass={
            rowsToBeDeleted.includes(String(data.unique_key)) ? classes.activeRow : ''
          }
        />
      ))}
    </tr>
  );
}

export default Row;
