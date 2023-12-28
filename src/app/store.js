import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import historyReducer from '../features/history/historySlice';
import messagesReducer from '../features/messages/messagesSlice';
import filesReducer from '../features/files/filesSlice';
import sidebarReducer from '../features/sidebar/SidebarSlice';
import projectReducer from '../features/projects/ProjectSlice';
import settingsReducer from '../features/settings/SettingsSlice';
import libraryReducer from '../features/Library/LibrarySlice';
import taskReducer from '../features/tasks/TaskSlice';


export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth: authReducer,
        history:historyReducer,
        messages:messagesReducer,
        files:filesReducer,
        sidebar:sidebarReducer,
        projects:projectReducer,
        library:libraryReducer,
        settings:settingsReducer,
        tasks:taskReducer
    },

    
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
    devTools: true
})