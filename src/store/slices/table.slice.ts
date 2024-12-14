import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableRow {
  unique_key?: string | number;
  [key: string]: string | number | undefined;
}

interface TableState {
  data: TableRow[];
}

interface DeleteRowInterface {
  rows: (string | number)[];
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
      state.data = state.data.filter(
        (row) => row.unique_key === undefined || !rows.includes(row.unique_key),
      );
    },
  },
});

export const { setTableData, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;
