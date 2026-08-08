import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserService } from "../../services/authService";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getCurrentUserService();
      return res.data;
    } catch (error) {
      const status = error.response?.status;
      const data = error.response?.data;
      return rejectWithValue({ status, data });
    }
  }
);

const initialState = {
  data: null,
  isLoading: true,
  error: null,
  authStatus: "checking"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.authStatus = "authenticated";
      state.error = null;
    },
    clearUser: (state) => {
      state.data = null;
      state.error = null;
      state.authStatus = "unauthenticated";
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.authStatus = "checking";
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
      state.authStatus = "authenticated";
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      const status = action.payload?.status;

      state.isLoading = false;

      if (status === 401) {
        state.data = null;
        state.error = null;
        state.authStatus = "unauthenticated";
      } else {
        state.error = action.payload;
        state.authStatus = "unknown";
      }
    });
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
