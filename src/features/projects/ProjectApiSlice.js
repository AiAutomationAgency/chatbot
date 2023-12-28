import { apiSlice } from "../../app/api/apiSlice";
import { getSingleProject, getUserProjects } from "./ProjectSlice";

export const ProjectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserProjects: builder.query({
      query: () => ({
        url: "/user/projects/",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUserProjects(data.results));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: "/create-project/",
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
      invalidatesTags: ["Projects"],
    }),
    updateProject: builder.mutation({
      query: ({ data, project_id }) => ({
        url: `/update-project/${project_id}/`,
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
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (project_id) => ({
        url: `/project/delete/${project_id}/`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Projects"],
    }),
    fetchProjectById: builder.query({
      query: (id) => ({
        url: `/user/projects/${id}`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getSingleProject(data[0]));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Projects"],
    }),
  }),
});

export const {
  useFetchUserProjectsQuery,
  useAddProjectMutation,
  useFetchProjectByIdQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = ProjectApiSlice;
