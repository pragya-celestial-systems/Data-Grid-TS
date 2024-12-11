import { configureStore } from "@reduxjs/toolkit";
import tableReducers from "./slices/table.slice.ts";

const store = configureStore({
  reducer: {
    tableData: tableReducers,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
export default store;
