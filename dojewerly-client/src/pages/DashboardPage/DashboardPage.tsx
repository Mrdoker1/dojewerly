import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getUserProfile } from '../../app/reducers/userSlice';
import Tabs from '../../components/Tabs/Tabs';
import Tab from '../../components/Tabs/Tab/Tab';
import variables from '../../variables.module.css';
import styles from './DashboardPage.module.css';
import ProfilePage from '../ProfilePage/ProfilePage';

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user === null) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1>Welcome back, {user?.username}!</h1>
        <p className={variables.description}>Enjoy shopping with ease and happiness.</p>
      </div>
      <Tabs activeTab="Profile">
        <Tab title="Profile">
          <ProfilePage />
        </Tab>
        <Tab title="Favourites">
          <p>Content for Favourites</p>
        </Tab>
      </Tabs>
    </main>
  );
};

export default DashboardPage;