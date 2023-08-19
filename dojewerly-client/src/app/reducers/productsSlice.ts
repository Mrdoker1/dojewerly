import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const apiUrl = process.env.REACT_APP_API_URL;

// Define the Product type
export interface Product {
  _id: string;
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

// Определяем тип для параметров запроса
interface FetchAllProductsParams {
  sort?: string;
  order?: string;
  q?: string;
  page?: number;
  limit?: number;
}

// Async action to create a new product
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: Product, thunkAPI) => {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('No session');
    }

    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    const token = localStorage.getItem('token'); // Получение токена

    if (!token) {
      throw new Error('No session'); // Проверка наличия токена
    }

    const response = await fetch(`${apiUrl}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Добавление заголовка авторизации
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete product');
    }

    return id; // Return the deleted product's ID
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (queryParams: FetchAllProductsParams, thunkAPI) => {
    try {
      // Деструктуризация параметров запроса
      const { sort, order, q, page, limit } = queryParams;

      // Формирование строки запроса с использованием деструктуризации и шаблонных строк
      const queryString = Object.entries({ sort, order, q, page, limit })
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      const url = `${apiUrl}/products?${queryString}`;
      const response = await fetch(url);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Не удалось загрузить продукты');
      }

      return await response.json(); // Предполагая, что ответ содержит массив продуктов
    } catch (error) {
      throw new Error('Не удалось загрузить продукты');
    }
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
        const productIndex = state.products.findIndex((prod) => prod._id === action.payload.id);
        if (productIndex > -1) {
          state.products[productIndex] = action.payload.productData;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = 'succeeded';
        state.products = state.products.filter((prod) => prod._id !== action.payload);
      })
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;