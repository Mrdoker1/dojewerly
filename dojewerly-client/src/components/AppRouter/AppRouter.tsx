import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import Catalog from '../../pages/Catalog/Catalog';
import ProductPage from '../../pages/ProductPage/ProductPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import NoPage from '../../pages/NoPage/NoPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import DasboardPage from '../../pages/DashboardPage/DashboardPage';

const AppRouter = memo(() => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<DasboardPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
});

export default AppRouter;