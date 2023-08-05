import React, { memo, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import Catalog from '../../pages/Catalog/Catalog';
import ProductPage from '../../pages/ProductPage/ProductPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import NoPage from '../../pages/NoPage/NoPage';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { checkUserSession } from '../../app/reducers/authSlice';

const AppRouter = memo(() => {
  const auth = useSelector((state: RootState) => state.auth);
  const isUserLoggedIn = Boolean(auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    dispatch(checkUserSession())
      .then(() => setIsChecking(false))
      .catch(() => setIsChecking(false));
  }, [dispatch]);

  if (isChecking) {
    return <div>Loading...</div>;  // Или любой другой компонент загрузки
  }
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={ <ProtectedRoute isAllowed={isUserLoggedIn} redirectPath="/signin" children={<DashboardPage />} />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
});

export default AppRouter;