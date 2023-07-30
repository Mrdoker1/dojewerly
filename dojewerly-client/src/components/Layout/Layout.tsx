import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = memo(() => {

  return (
    <>
      <div className={styles.container}>
        <Header />
          <Outlet></Outlet>
        <Footer />
      </div>
    </>
  );
});

export default Layout;