import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../Constants";

const initialState = {
  data: [],
  loading: false,
  error: null,
  userData: {}, // Initialize userData as an empty object
  userDataError: {}, // Initialize userDataError as an empty object
};

// Create an async thunk for fetching data
export const fetchDataAsync = createAsyncThunk(
  "blogs/search",
  async ({queryWord}, { rejectWithValue }) => {
    console.log(queryWord)
    try {
      const response = await fetch(API_URL + "/blogs/search?word="+queryWord);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

// Create an async thunk for fetching user data by user ID
export const fetchUserDataAsync = createAsyncThunk(
  "users/fetchUserData",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/people/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result =  await response.json();
      console.log(result[0])
      return result[0]
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the data slice
const searchLogsSlice = createSlice({
  name: "searchLogs",
  initialState,
  reducers: {},
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

export default searchLogsSlice.reducer;
