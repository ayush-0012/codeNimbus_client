import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface selectedOption {
  lang: string | null;
}

const initialState: selectedOption = {
  lang: sessionStorage.getItem("lang") || null,
};

export const selectedOptionSlice = createSlice({
  name: "langOptions",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string | null>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = selectedOptionSlice.actions;
export const lang = (state: RootState) => state.selectedOption.lang;
export default selectedOptionSlice.reducer;
