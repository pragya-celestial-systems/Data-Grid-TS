import React, { useEffect, useState } from "react";
import Column from "./Column.tsx";
import { Checkbox } from "@mui/material";
import { useRowContext } from "../context/RowContext.tsx";
import { makeStyles } from "@mui/styles";

const useRowStyles = makeStyles({
  tableRow: {
    "&:hover": {
      backgroundColor: "whitesmoke",
      cursor: "pointer",
      transition: "0.3s",
    },
  },
  activeRow: {
    background: "whitesmoke",
  },
});

interface RowProps {
  data: object;
}

function Row({ data }: RowProps) {
  const classes = useRowStyles();
  const [rowData, setRowData] = useState<string[]>([]);
  const { rowsToBeDeleted, setRowsToBeDeleted } = useRowContext();

  useEffect(() => {
    if (data) {
      // Extract values excluding the last key
      const dataArray = Object.values(data);
      const updatedDataArray = dataArray.slice(0, dataArray.length - 1);
      setRowData(updatedDataArray);
    }
  }, [data]);

  function handleCheck(key: string) {
    if (rowsToBeDeleted.includes(key)) {
      setRowsToBeDeleted(rowsToBeDeleted.filter((item) => item !== key));
    } else {
      setRowsToBeDeleted([...rowsToBeDeleted, key]);
    }
  }

  return (
    <tr data-row-index={data.unique_key} className={classes.tableRow}>
      <td>
        <Checkbox
          onChange={() => handleCheck(data.unique_key)}
          checked={rowsToBeDeleted.includes(data.unique_key)}
        />
      </td>
      {rowData.map((value, index) => (
        <Column
          value={value}
          key={index}
          tableClass={
            rowsToBeDeleted.includes(data.unique_key) ? classes.activeRow : ""
          }
        />
      ))}
    </tr>
  );
}

export default Row;
