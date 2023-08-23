import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDashboardState {
  selectedProductId: string | null;
  imagesOrder: string[]; // Состояние для хранения порядка изображений
}

const initialState: UserDashboardState = {
  selectedProductId: null,
  imagesOrder: [],
};

const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
      state.imagesOrder = []; // сброс порядка изображений
    },
    deselectProduct: (state) => {
      state.selectedProductId = null;
      state.imagesOrder = [];
    },
    setImagesOrder: (state, action: PayloadAction<string[]>) => {
      state.imagesOrder = action.payload;
    },
    deleteImageFromOrder: (state, action: PayloadAction<string>) => {
      state.imagesOrder = state.imagesOrder.filter(url => url !== action.payload);
    }
  },
});

export const { selectProduct, deselectProduct, setImagesOrder, deleteImageFromOrder } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;