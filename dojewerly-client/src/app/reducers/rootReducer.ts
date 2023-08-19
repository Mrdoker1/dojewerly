import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducers/example/counterSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import productReducer from './productsSlice';
import notificationReducer from './notificationSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  products: productReducer,
  notification: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;