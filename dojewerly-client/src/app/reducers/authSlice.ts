import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// First, create the thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string; }, thunkAPI) => {
    const response = await fetch('http://localhost:4000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        role: "user"
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to register');
    }

    const data = await response.json();

    return data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string; }, thunkAPI) => {
    const response = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to login');
    }

    const data = await response.json();

    return data;
  }
);

// Then, create the slice
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      token: null as string | null,
      status: 'idle',
      error: null as string | null
    },
    reducers: {
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
          state.status = 'succeeded';
          // Add user to the state array
          state.token = action.payload.token;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        })
        .addCase(loginUser.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string }>) => {
          state.status = 'succeeded';
          state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        });
    },
  });
  
  export const { clearError } = authSlice.actions;
  export default authSlice.reducer;