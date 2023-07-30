import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import Catalog from '../../pages/Catalog/Catalog';
import ProductPage from '../../pages/ProductPage/ProductPage';
import SignUp from '../../pages/SignUp/SignUp';
import NoPage from '../../pages/NoPage/NoPage';

const AppRouter = memo(() => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
});

export default AppRouter;