import { TableCell } from "@mui/material";
import React from "react";

interface ColumnProps {
  value: string;
  tableClass: string;
}

function Column({ value, tableClass }: ColumnProps) {
  return <TableCell className={tableClass}>{value}</TableCell>;
}

export default Column;
