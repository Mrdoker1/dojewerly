import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getUserProfile } from '../../app/reducers/userSlice';
import Tabs from '../../components/Tabs/Tabs';
import variables from '../../variables.module.css';
import styles from './DashboardPage.module.css';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile()); // Получение профиля пользователя
    }
  }, [dispatch, token]); // Зависимость от токена

  const tabs = [
    { title: 'PROFILE', route: '/dashboard/profile' },
    { title: 'FAVOURITES', route: '/dashboard/favourites' },
  ];

  if (user?.role === 'admin') {
    tabs.push(
      { title: 'PRODUCTS', route: '/dashboard/products' },
      { title: 'COLLECTIONS', route: '/dashboard/collections' },
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Welcome back, {user?.username}!</h1>
        <p className={variables.description}>Enjoy shopping with ease and happiness.</p>
      </div>
      <Tabs tabs={tabs} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardPage;