import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducers/example/counterSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;