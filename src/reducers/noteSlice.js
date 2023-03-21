import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateNote = createAsyncThunk(
  "note/UpdateNote",
  async ({ id, body }) => {
    const { data } = await axios.put("/api/notes", { id, body });
    return data;
  }
);

export const getNotes = createAsyncThunk(
  "note/getNotes",
  async ({ transactionId }) => {
    const { data } = await axios.post("/api/notes", { transactionId });
    return data;
  }
);
export const getNote = createAsyncThunk("note/getNote", async (id) => {
  const { data } = await axios.get(`/api/notes/${id}`);
  return data;
});

export const addNote = createAsyncThunk("note/addNote", async ({ body }) => {
  const { data } = await axios.post(`/api/notes/addnote`, body);
  return data;
});

export const deleteNote = createAsyncThunk("note/deleteNote", async (id) => {
  console.log(id);
  const { data } = await axios.delete(`/api/notes/${id}`);
  return id;
});

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    notesArr: [],
    note: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notesArr = action.payload;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.notesArr = state.notesArr.filter(
          (note) => note.id !== action.payload.id
        );
        state.notesArr.push(action.payload);
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.note = action.payload;
      })
      .addCase(addNote.fulfilled, (state, action) => {
        state.notesArr.push(action.payload);
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notesArr = state.notesArr.filter(
          (note) => note.id !== action.payload
        );
      });
  },
});

export const selectNote = (state) => {
  return state.notePage.note;
};
export const selectAllNotes = (state) => {
  return state.notePage.notesArr;
};

export default noteSlice.reducer;
