import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO : Remove the use of 'any'
interface TableRow {
  [key: string]: string | number;
}

interface TableState {
  data: TableRow[];
}

interface DeleteRowInterface {
  rows: string[];
}

interface Row {
  row: {
    unique_key: string
  }
}

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: 'table-slice',
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
    },
    deleteRow: (state, action: PayloadAction<DeleteRowInterface>) => {
      const { rows } = action.payload;
      state.data = state.data.filter((row: Row) => !rows.includes(row.unique_key));
    },
  },
});

export const { setTableData, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;
