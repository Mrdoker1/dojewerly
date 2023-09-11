import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CatalogState extends ProductQueryParams {}

export interface ProductQueryParams {
  [key: string]: string | number | undefined;
  sort?: string;
  order?: string;
  q?: string;
  page?: number;
  limit?: number;
  material?: string;
  gender?: string;
  availability?: string;
  stock?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const initialState: CatalogState = {
  sort: undefined,
  order: undefined,
  q: undefined,
  page: undefined,
  limit: undefined,
  material: undefined,
  gender: undefined,
  type: undefined,
  availability: undefined,
  stock: undefined,
  minPrice: undefined,
  maxPrice: undefined
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    // Установить значение фильтра
    setFilter: (state, action: PayloadAction<{ name: keyof ProductQueryParams, value: ProductQueryParams[keyof ProductQueryParams] }>) => {
      const { name, value } = action.payload;
      console.log("Setting filter in Redux:", name, value);
      state[name] = value;
    },
    // Сбросить все фильтры
    resetFilters: (state) => {
      return initialState;
    }
  }
});

export const { setFilter, resetFilters } = catalogSlice.actions;
export default catalogSlice.reducer;
