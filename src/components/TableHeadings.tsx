import { Checkbox, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import THeading from "./THeading.tsx";
import { useRowContext } from "../context/RowContext.tsx";

interface TableHeadingProps {
  headings: object;
}

function TableHeading({ headings }: TableHeadingProps) {
  const [keys, setKeys] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { setAreAllSelected, setRowsToBeDeleted, areAllSelected } =
    useRowContext();

  useEffect(() => {
    if (headings) {
      const objectKeys = Object.keys(headings);
      const updatedObjectKeys = objectKeys.splice(0, objectKeys.length - 1);
      setKeys(updatedObjectKeys);
      setIsChecked(areAllSelected);
    }
  }, [headings]);

  function handleSelectAll(e: React.ChangeEvent<HTMLInputElement>) {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setAreAllSelected(true);
    } else {
      setAreAllSelected(false);
      setRowsToBeDeleted([]);
    }
  }

  return (
    <TableRow>
      <Checkbox onChange={handleSelectAll} checked={isChecked} />
      {keys.map((key, index) => (
        <THeading key={index} index={index} heading={key} columnKey={key} />
      ))}
    </TableRow>
  );
}

export default TableHeading;
