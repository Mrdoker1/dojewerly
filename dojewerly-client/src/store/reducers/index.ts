import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

export interface RootState {
  counter: ReturnType<typeof counterReducer>;
  // Добавьте другие редюсеры здесь, если есть
}

const rootReducer = combineReducers({
  counter: counterReducer,
  // Добавьте другие редюсеры здесь, если есть
});

export default rootReducer;