import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { getUserProfile } from '../../app/reducers/userSlice';
import variables from '../../variables.module.css'

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (user === null) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  return (
    <main className="main">
      <h1>Welcome back, {user?.username}!</h1>
      <p
        className={variables.description}
        style={{color: 'var(--grey-1)'}}>Enjoy shopping with ease and happiness.</p>
    </main>
  );
};

export default DashboardPage;