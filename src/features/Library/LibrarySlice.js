import { createSlice } from "@reduxjs/toolkit";

const LibrarySlice = createSlice({
  name: "library",

  initialState: {
    library: [],
    isFiltered: false,
    filteredLibrary: [],
    message: "",
    sidebar: "filters",
    isOpen: false,
    files: [],
  },

  reducers: {
    getLibraryProjects: (state, action) => {
      state.library = action.payload;
    },
    getLibraryFiltered: (state, action) => {
      state.filteredLibrary = action.payload;
    },
    toggleIsFiltered: (state, action) => {
      state.isFiltered = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.sidebar = action.payload.sidebar;
      state.isOpen = action.payload.isOpen;
    },
    setSidebarFiles: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const {
  getLibraryProjects,
  getLibraryFiltered,
  setSidebarFiles,
  toggleIsFiltered,
  toggleSidebar,
} = LibrarySlice.actions;

export default LibrarySlice.reducer;

export const selectCurrentLibrary = (state) => state.library.library;
export const selectCurrentLibraryFiltered = (state) =>
  state.library.filteredLibrary;
export const selectCurrentIsFiltered = (state) => state.library.isFiltered;

export const selectCurrentIsOpen = (state) => state.library.isOpen;

export const selectCurrentSidebar = (state) => state.library.sidebar;
export const selectCurrentSidebarFiles = (state) => state.library.files;
