import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: { isOpen: false },
  reducers: {
    toggleOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleOpen } = sidebarSlice.actions;

export default sidebarSlice.reducer;

export const selectCurrentOpen = (state) => state.sidebar.isOpen;
