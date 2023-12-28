import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./BaseURL";

const baseQuery = fetchBaseQuery({
  // baseUrl: 'https://flasktest-vkre.onrender.com',
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.access_token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: [
    "User",
    "Files",
    "Messages",
    "History",
    "Projects",
    "Library",
    "Tasks",
  ],
  endpoints: (builder) => ({}),
});
