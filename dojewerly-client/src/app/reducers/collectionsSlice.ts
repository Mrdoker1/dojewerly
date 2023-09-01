import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

export interface Collection {
  _id?: string;
  name: string;
  products: string[];
}

// Async action to get all collections
export const fetchAllCollections = createAsyncThunk(
  'collections/fetchAll',
  async (_, thunkAPI) => {
    const response = await fetch(`${apiUrl}/collections`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch collections');
    }

    return await response.json();
  }
);

// Async action to create a new collection
export const createCollection = createAsyncThunk(
  'collections/create',
  async (collectionData: Collection, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(collectionData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create collection');
    }

    const data = await response.json();
    return data;
  }
);

// Async action to get a collection by id
export const fetchCollectionById = createAsyncThunk(
  'collections/fetchById',
  async (id: string, thunkAPI) => {
    const response = await fetch(`${apiUrl}/collections/${id}`);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to fetch collection');
    }

    return await response.json();
  }
);

// Async action to update a collection by id
export const updateCollectionById = createAsyncThunk(
  'collections/update',
  async ({ id, collectionData }: { id: string; collectionData: Collection; }, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/collections/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(collectionData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update collection');
    }

    return { id, collectionData };
  }
);

// Async action to delete a collection by id
export const deleteCollection = createAsyncThunk(
  'collections/delete',
  async (id: string, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/collections/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete collection');
    }

    return id;
  }
);

// Create the slice
export const collectionsSlice = createSlice({
  name: 'collections',
  initialState: {
    collections: [] as Collection[],
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCollections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCollections.fulfilled, (state, action: PayloadAction<Collection[]>) => {
        state.status = 'succeeded';
        state.collections = action.payload;
      })
      .addCase(fetchAllCollections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCollection.fulfilled, (state, action: PayloadAction<Collection>) => {
        state.status = 'succeeded';
        state.collections.push(action.payload);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchCollectionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCollectionById.fulfilled, (state, action: PayloadAction<Collection>) => {
        state.status = 'succeeded';
        const collectionIndex = state.collections.findIndex((coll) => coll._id === action.payload._id);
        if (collectionIndex > -1) {
          state.collections[collectionIndex] = action.payload;
        } else {
          state.collections.push(action.payload);
        }
      })
      .addCase(fetchCollectionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateCollectionById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCollectionById.fulfilled, (state, action: PayloadAction<{ id: string; collectionData: Collection }>) => {
        state.status = 'succeeded';
        const collectionIndex = state.collections.findIndex((coll) => coll._id === action.payload.id);
        if (collectionIndex > -1) {
          state.collections[collectionIndex] = action.payload.collectionData;
        }
      })
      .addCase(updateCollectionById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCollection.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.collections = state.collections.filter((coll) => coll._id !== action.payload);
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default collectionsSlice.reducer;