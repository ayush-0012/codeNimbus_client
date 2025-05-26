import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface file {
  fileId: string | null;
}

const initialState: file = {
  fileId: sessionStorage.getItem("fileId") || null,
};

export const fileSlice = createSlice({
  name: "fileDetails",
  initialState,
  reducers: {
    setFileId: (state, action: PayloadAction<string | null>) => {
      state.fileId = action.payload;
    },

    removeFileId: (state, action: PayloadAction<null>) => {
      state.fileId = action.payload;
    },
  },
});

export const { setFileId, removeFileId } = fileSlice.actions;
export const fileId = (state: RootState) => state.file.fileId;
export default fileSlice.reducer;
