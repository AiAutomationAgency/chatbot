import { apiSlice } from "../../app/api/apiSlice";
import { getLang, getModel, getUser } from "./SettingsSlice";

export const SettingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => ({
        url: "/user-settings/",
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUser(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Settings", "User"],
    }),
    updateUser: builder.mutation({
      query: ({ data }) => ({
        url: "/user_change/",
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(getUser(data));
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["User"],
    }),
    updateModel: builder.mutation({
      query: ({ data }) => ({
        url: `/api/temp/`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { language, ...prev } = data;
          dispatch(getModel(prev));
          dispatch(getLang(language));
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Settings"],
    }),
    fetchModel: builder.query({
      query: () => ({
        url: `/user_pref/`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { language, ...prev } = data;

          dispatch(getModel(prev));
          dispatch(getLang(language));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Settings"],
    }),
    events: builder.query({
      query: () => ({
        url: `/events/`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["Settings"],
    }),
    updatePass: builder.mutation({
      query: ({ data }) => ({
        url: `/change-pass/`,
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
      invalidatesTags: ["User"],
    }),
    generateImage: builder.mutation({
      query: ({ data }) => ({
        url: `/image_gen/`,
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
      invalidatesTags: ["User"],
    }),
    fetchImage: builder.query({
      query: () => ({
        url: `/user_profile/`,
        method: "GET",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchImageQuery,
  useGenerateImageMutation,
  useUpdateUserMutation,
  useUpdatePassMutation,
  useUpdateModelMutation,
  useFetchModelQuery,
  useEventsQuery,
} = SettingsApiSlice;
