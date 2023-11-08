import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, logInUser } from './authAPI';

const initialState = {
  loggedInUser: localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null,
  error: null,
  status: 'idle',
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);


export const logInUserAsync = createAsyncThunk(
  'user/logInUser',
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await logInUser(loginInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      localStorage.removeItem("userInfo");
      state.loggedInUser = null;
    },
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(logInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(state.loggedInUser));
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload; // isme error aayegi 
      });
  },
});

export const { logOutUser } = authSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;


export default authSlice.reducer;
