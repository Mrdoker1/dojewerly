import React, { useEffect } from 'react';
import AppRouter from '../components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkUserSession } from '../app/reducers/authSlice';
import { AppDispatch } from '../app/store';
import './App.module.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
  );
}

export default App;