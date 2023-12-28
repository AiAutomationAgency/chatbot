import { createSlice } from "@reduxjs/toolkit";

const ProjectSlice = createSlice({
  name: "projects",
  initialState: { projects: [], project: {}, message: "" },
  reducers: {
    getUserProjects: (state, action) => {
      state.projects = action.payload;
    },
    getSingleProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { getUserProjects, getSingleProject } = ProjectSlice.actions;

export default ProjectSlice.reducer;

export const selectCurrentProjects = (state) => state.projects.projects;
export const selectCurrentProject = (state) => state.projects.project;
