import { apiSlice } from "../../app/api/apiSlice";
import { getUserTasks, getSingleTask } from "./TaskSlice";

export const TaskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserTasks: builder.query({
      query: () => ({
        url: "/tasks/",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUserTasks(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: ({ project_id, data }) => ({
        url: `projects/${project_id}/tasks/create/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ data, task_id }) => ({
        url: `/tasks/${task_id}/update/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (task_id) => ({
        url: `tasks/${task_id}/delete/`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Tasks"],
    }),
    fetchTaskById: builder.query({
      query: (id) => ({
        url: `/tasks/${id}/`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getSingleTask(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Projects"],
    }),
  }),
});

export const {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useFetchUserTasksQuery,
  useUpdateTaskMutation,
  useFetchTaskByIdQuery,
} = TaskApiSlice;
