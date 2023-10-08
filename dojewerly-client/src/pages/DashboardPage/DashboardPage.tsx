import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getUserProfile } from '../../app/reducers/userSlice';
import Tabs from '../../components/Tabs/Tabs';
import variables from '../../variables.module.css';
import styles from './DashboardPage.module.css';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.auth.token);
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile()); // Получение профиля пользователя
    }
  }, [dispatch, token]); // Зависимость от токена

  const tabs = [
    { title: t('PROFILE'), route: '/dashboard/profile' },
    { title: t('FAVOURITES'), route: '/dashboard/favourites' },
  ];

  if (user?.role === 'admin') {
    tabs.push(
      { title: t('PRODUCTS'), route: '/dashboard/products' },
      { title: t('COLLECTIONS'), route: '/dashboard/collections' },
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <div className={styles.headingContainer}>
        <h1>{`${t('Welcome back')}, ${user?.username}!`}</h1>
        <p className={variables.description}>{`${t('Enjoy shopping with ease and happiness')}.`}</p>
      </div>
      <Tabs tabs={tabs} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </motion.div>
  );
};

export default DashboardPage;