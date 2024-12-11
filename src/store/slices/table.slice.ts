import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableRow {
  [key: string]: any;
}

interface TableState {
  data: TableRow[];
}

interface DeleteRowInterface {
  rows: string[];
}

const initialState: TableState = {
  data: [],
};

const tableSlice = createSlice({
  name: "table-slice",
  initialState,
  reducers: {
    setTableData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
    },
    deleteRow: (state, action: PayloadAction<DeleteRowInterface>) => {
      const { rows } = action.payload;
      state.data = state.data.filter((row) => !rows.includes(row.unique_key));
    },
  },
});

export const { setTableData, deleteRow } = tableSlice.actions;
export default tableSlice.reducer;
