import React from 'react';
import { TableCell } from '@mui/material';

interface ColumnProps {
  value: string | number;
  tableClass: string;
}

function Column({ value, tableClass }: ColumnProps) {
  return <TableCell className={tableClass}>{value}</TableCell>;
}

export default Column;
