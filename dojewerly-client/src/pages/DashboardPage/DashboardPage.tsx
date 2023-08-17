import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getUserProfile } from '../../app/reducers/userSlice';
import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tabs/Tab/Tab';
import variables from '../../variables.module.css';
import styles from './DashboardPage.module.css';
import ProfilePage from '../ProfilePage/ProfilePage';
import ProductCreationPage from '../../pages/ProductCreationPage/ProductCreationPage';
import CollectionCreationPage from '../../pages/CollectionCreationPage/CollectionCreationPage';

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
    <Tab title="Profile" key="profile">
      <ProfilePage />
    </Tab>,
    <Tab title="Favourites" key="favourites">
      <p>Content for Favourites</p>
    </Tab>,
  ];

  if (user?.role === 'admin') {
    tabs.push(
      <Tab title="Products" key="products">
        <ProductCreationPage />
      </Tab>,
      <Tab title="Collections" key="products">
        <CollectionCreationPage />
      </Tab>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Welcome back, {user?.username}!</h1>
        <p className={variables.description}>Enjoy shopping with ease and happiness.</p>
      </div>
      <Tabs activeTab="Profile">{tabs}</Tabs>
    </main>
  );
};

export default DashboardPage;