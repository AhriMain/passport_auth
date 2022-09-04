import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginApi, registerApi } from "../api/authApi";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  success: null,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (payload, thunkApi) => {
    try {
      const { data } = await registerApi(payload);
      return data;
    } catch ({ response }) {
      return thunkApi.rejectWithValue(response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkApi) => {
    try {
      console.log(payload);
      const { data } = await loginApi(payload);
      return data;
    } catch ({ response }) {
      console.log(response);
      return thunkApi.rejectWithValue(response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setError: (state, { payload }) => {
      state.isError = true;
      state.error = payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },

  extraReducers: (builder) => {
    // register
    builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.isError = false;
      state.success = payload.msg;
      state.error = null;
      localStorage.setItem("auth-token", payload.access);
    });
    builder.addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.isError = true;
      state.success = null;
      state.error = payload?.msg || "Something went wrong!";
    });

    // login
    builder.addCase(login.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.isLoggedIn = true;
      state.isSuccess = true;
      state.isError = false;
      state.success = payload.msg;
      state.error = null;
      localStorage.setItem("auth-token", payload.access);
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.isError = true;
      state.success = null;
      state.error = payload?.msg || "Something went wrong! in slice";
    });
  },
});

export const { setError } = authSlice.actions;

export default authSlice.reducer;
