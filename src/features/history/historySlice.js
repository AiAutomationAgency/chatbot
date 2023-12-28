import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: { conversations: [] },
  reducers: {
    setHistory: (state, action) => {
      state.conversations = action.payload;
    },
  },
});

export const { setHistory } = historySlice.actions;

export default historySlice.reducer;

export const selectCurrentHistory = (state) => state.history.conversations;
