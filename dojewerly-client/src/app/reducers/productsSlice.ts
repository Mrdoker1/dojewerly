import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the Product type
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  props: {
    id: number;
    info: string;
    description: string;
    part: string;
    material: string;
    gender: string;
    type: string;
  };
  imageURLs: string[];
}

// Async action to create a new product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: Product, thunkAPI) => {
    const response = await fetch('http://localhost:4000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to create product');
    }

    const data = await response.json();
    return data;
  }
);

// Async action to update a product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, productData }: { id: string; productData: Product; }, thunkAPI) => {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData)
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to update product');
    }

    return { id, productData };
  }
);

// Async action to delete a product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: string, thunkAPI) => {
    const response = await fetch(`http://localhost:4000/products/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete product');
    }

    return id; // Return the deleted product's ID
  }
);

// Then, create the slice
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as Product[],
    status: 'idle',
    error: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<{ id: string; productData: Product }>) => {
        state.status = 'succeeded';
        const productIndex = state.products.findIndex((prod) => prod.id === action.payload.id);
        if (productIndex > -1) {
          state.products[productIndex] = action.payload.productData;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.products = state.products.filter((prod) => prod.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;