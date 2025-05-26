import { configureStore } from "@reduxjs/toolkit";
import containerSlice from "./feature/container/containerSlice";
import selectedOptionSlice from "./feature/langs/langOptionsSlice";
import fileSlice from "./feature/file/fileSlice";

export const store = configureStore({
  reducer: {
    container: containerSlice,
    selectedOption: selectedOptionSlice,
    file: fileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
