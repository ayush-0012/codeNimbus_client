import { configureStore } from "@reduxjs/toolkit";
import containerSlice from "./feature/container/containerSlice";
import selectedOptionSlice from "./feature/langs/langOptionsSlice";

export const store = configureStore({
  reducer: {
    container: containerSlice,
    selectedOption: selectedOptionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
