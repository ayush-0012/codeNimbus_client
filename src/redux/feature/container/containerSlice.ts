import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface containerState {
  containerId: string | null;
}

const initialState: containerState = {
  containerId: sessionStorage.getItem("containerId") || null,
};

export const containerSlice = createSlice({
  name: "container",
  initialState,
  reducers: {
    setContainerId: (state, action: PayloadAction<string>) => {
      state.containerId = action.payload;
    },
    clearContainerId: (state) => {
      state.containerId = null;
    },
  },
});

export const { setContainerId, clearContainerId } = containerSlice.actions;
export const containerId = (state: RootState) => state.container.containerId;
export default containerSlice.reducer;
