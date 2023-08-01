import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducers/example/counterSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;