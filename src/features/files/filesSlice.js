import { createSlice } from "@reduxjs/toolkit";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    files: [],
    uploadedFile: null,
    selectedFiles: [],
    show: true,
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    uploadFile: (state, action) => {
      state.uploadedFile = action.payload;
    },
    selectFile: (state, action) => {
      state.selectedFiles = action.payload;
    },
    toggleShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

export const { setFiles, uploadFile, selectFile, toggleShow } =
  filesSlice.actions;

export default filesSlice.reducer;

export const selectCurrentFiles = (state) => state.files.files;
export const selectCurrentUploadedFile = (state) => state.files.uploadedFile;
export const selectCurrentSelectedFiles = (state) => state.files.selectedFiles;
export const selectCurrentShow = (state) => state.files.show;
