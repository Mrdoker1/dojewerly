import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserDashboardState {
  selectedProductId: string | null;
  // Другие свойства, которые могут потребоваться для дашборда
}

const initialState: UserDashboardState = {
  selectedProductId: null,
  // Инициализация других свойств
};

const userDashboardSlice = createSlice({
  name: 'userDashboard',
  initialState,
  reducers: {
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
    },
    deselectProduct: (state) => {
      state.selectedProductId = null;
    },
    // Другие действия, если потребуются
  },
});

export const { selectProduct, deselectProduct /* другие экспортируемые действия */ } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;