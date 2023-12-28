import { apiSlice } from "../../app/api/apiSlice";
import { setHistory } from "./historySlice";

export const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAll: builder.query({
      query: () => ({
        url: "/user-conversations/",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setHistory(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["History"],
    }),
  }),
});

export const { useGetAllQuery } = historyApiSlice;
