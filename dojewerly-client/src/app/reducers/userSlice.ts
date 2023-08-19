import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  _id: string;
  username: string;
  password: string;
  __v: number;
  role: string;
  favorites: string[];
  settings: {
    email: boolean;
  }
}

interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch user profile');
    }

    const data = await response.json();

    return data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async ({ username, password, settings }: { username: string; password: string; settings?: { email: boolean } }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        password,
        settings,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update user profile');
    }

    if (response.headers.get('content-length') === '0') {
      return {};
    } else {
      const data = await response.json();
      return data;
    }
  }
);

export const patchUserProfile = createAsyncThunk(
  'user/patchUserProfile',
  async (update: { username?: string; password?: string; settings?: { email: boolean } }, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}4000/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(update),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to patch user profile');
    }

    const data = await response.json();

    return data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(patchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(patchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
      
  },
});

export default userSlice.reducer;