import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    userData: {}, // Initialize userData as an empty object
    userDataError: {}, // Initialize userDataError as an empty object
  };

// Create an async thunk for fetching user data by user ID
export const fetchUserDataAsync = createAsyncThunk(
  "users/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const apiUrl = `http://localhost:1000`;
      const response = await fetch(`${API_URL}/people/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      return result[0]
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDataAsync = createAsyncThunk(
  "bytes/latest",
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = `http://localhost:1000`;
      const response = await fetch(API_URL + "/bytes/latest");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);


const latestByteSlice = createSlice({
  name: "latestBytes",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDataAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        const userData = action.payload;
        state.userData[action.meta.arg] = userData;
      })
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.userDataError[action.meta.arg] = action.payload;
      });
  },
});

//export const { setCredentials, logout } = authSlice.actions;
export default latestByteSlice.reducer;
