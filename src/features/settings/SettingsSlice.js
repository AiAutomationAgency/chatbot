import { createSlice } from "@reduxjs/toolkit";

const SettigsSlice = createSlice({
  name: "settings",
  initialState: {
    user: {},
    security: {},
    message: "",
    lang: "",
    model: { model_name: "", llm_temperature: 0.7 },
  },
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getSecurity: (state, action) => {
      state.security = action.payload;
    },
    getModel: (state, action) => {
      state.model = action.payload;
    },
    getLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { getUser, getSecurity, getModel, getLang } = SettigsSlice.actions;

export default SettigsSlice.reducer;

export const selectCurrentUser = (state) => state.settings.user;
export const selectCurrentSecurity = (state) => state.settings.security;
export const selectCurrentLang = (state) => state.settings.lang;
export const selectCurrentModel = (state) => state.settings.model;
