import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateNote = createAsyncThunk(
  "note/UpdateNote",
  async ({ id, body }) => {
    const note = await axios.put("/api/notes", { id, body });
  }
);

export const getNotes = createAsyncThunk(
  "note/getNotes",
  async ({ transactionId }) => {
    const { data } = await axios.post("/api/notes", { transactionId });
    return data;
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    notesArr: [],
    note: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notesArr = action.payload;
    });
  },
});

export const selectAllNotes = (state) => {
  return state.notePage.notesArr;
};

export default noteSlice.reducer;
