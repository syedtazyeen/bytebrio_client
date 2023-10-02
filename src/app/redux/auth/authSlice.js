// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../../../Constants';

export const loginAsync = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const apiUrl = `${API_URL}/auth/login`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      } else if (response.status === 400) {
        throw new Error("Invalid Credentials");
      } else {
        throw new Error("Network response was not ok");
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});



export const signUpAsync = createAsyncThunk("auth/signup", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const apiUrl = `${API_URL}/auth/signup`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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






const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        // Handle login failure here if needed
        console.error("Login failed:", action.error.message);
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        // Handle signup failure here if needed
        console.error("Signup failed:", action.error.message);
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
