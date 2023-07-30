import AppRouter from '../components/AppRouter/AppRouter';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.module.css';

function App() {
  return (
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
  );
}

export default App;