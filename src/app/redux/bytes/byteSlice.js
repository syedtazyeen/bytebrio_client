import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../Constants";

export const postByteAsync = createAsyncThunk("bytes/add", async ({byteObject,token}, { rejectWithValue }) => {
    try {
      const apiUrl = `${API_URL}/bytes/add`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(byteObject),
      });
  
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error("Server error");
        } else throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  });
  

  const byteSlice = createSlice({
    name: "bytes",
    initialState: { user: null, token: null },
    reducers: {
    },
    extraReducers: (builder) => {
      builder
        .addCase(postByteAsync.fulfilled, (state, action) => {
          const { user, token } = action.payload;
          state.user = user;
          state.token = token;
        })
        .addCase(postByteAsync.rejected, (state, action) => {
          // Handle login failure here if needed
          console.error("Failed:", action.error.message);
        })
    },
  });
  
  //export const { setCredentials, logout } = authSlice.actions;
  export default byteSlice.reducer;
  