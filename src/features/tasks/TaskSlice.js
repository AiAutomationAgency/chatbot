import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: {}, task: {}, message: "" },
  reducers: {
    getUserTasks: (state, action) => {
      state.tasks = action.payload;
    },
    getSingleTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

export const { getUserTasks, getSingleTask } = TaskSlice.actions;

export default TaskSlice.reducer;

export const selectCurrentTasks = (state) => state.tasks.tasks;
export const selectCurrentTask = (state) => state.tasks.task;
