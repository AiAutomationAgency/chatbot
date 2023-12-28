import { createSlice } from "@reduxjs/toolkit";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    selectedConversation: null,
    summary: "",
    generaleChat: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setGeneralMessages: (state, action) => {
      state.generaleChat = [...state.generaleChat, action.payload];
    },
    setConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const {
  setMessages,
  setConversation,
  setSummary,
  updateMessages,
  setGeneralMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;

export const selectCurrentMessages = (state) => state.messages.messages;
export const selectCurrentConversationId = (state) =>
  state.messages.selectedConversation;
export const selectCurrentSummary = (state) => state.messages.summary;
export const selectCurrentGeneralMessages = (state) =>
  state.messages.generaleChat;
