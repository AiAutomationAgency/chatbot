import { apiSlice } from "../../app/api/apiSlice";
import { toggleShow } from "./filesSlice";

export const filesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (bodyFormData) => ({
        url: "/upload-file/",
        method: "POST",
        body: bodyFormData,
        formData: true,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(toggleShow(false));
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Files", "Projects"],
    }),
    selectFiles: builder.mutation({
      query: (body) => ({
        url: "/select/",
        method: "POST",
        body: body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Files", "Projects"],
    }),
  }),
});

export const { useUploadFileMutation, useSelectFilesMutation } = filesApiSlice;
