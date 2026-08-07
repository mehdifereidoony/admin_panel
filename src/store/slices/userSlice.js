import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUserService } from "../../services/authService";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const res = await getCurrentUserService();
    return res.data;
  }
);

const initialState = {
  data: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.data = null;
      state.isLoading = false;
    });
  },
});

export const { setUser, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
