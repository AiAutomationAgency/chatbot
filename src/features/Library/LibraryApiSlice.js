import { apiSlice } from "../../app/api/apiSlice";
import {
  getLibraryFiltered,
  getLibraryProjects,
  toggleIsFiltered,
} from "./LibrarySlice";

export const LibraryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    filterLibrary: builder.mutation({
      query: (body) => ({
        url: "/api/filter_files/",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(toggleIsFiltered(true));
          dispatch(getLibraryFiltered(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Library"],
    }),
    fetchLibrary: builder.query({
      query: () => ({
        url: "/projects/",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getLibraryProjects(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Library"],
    }),
  }),
});

export const { useFetchLibraryQuery, useFilterLibraryMutation } =
  LibraryApiSlice;
