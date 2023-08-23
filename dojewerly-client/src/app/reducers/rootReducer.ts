import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducers/example/counterSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import productReducer from './productsSlice';
import notificationReducer from './notificationSlice';
import userDashboardReducer from './userDashboardSlice';
import catalogCriteriaReducer from './catalogCriteriaSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  products: productReducer,
  notification: notificationReducer,
  userDashboard: userDashboardReducer,
  catalogCriteria: catalogCriteriaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;