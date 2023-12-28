import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("user")) || {
    username: null,
    access_token: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem(
        "user",
        JSON.stringify({ access_token: action.payload.token })
      );
      const { token } = action.payload;
      state.access_token = token;
    },
    logOut: (state, action) => {
      state.username = null;
      state.access_token = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.username;
export const selectCurrentToken = (state) => state.auth.access_token;
