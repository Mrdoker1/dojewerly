import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { useLayout } from './LayoutContext/LayoutContext';

const Layout = memo(() => {

  const { backgroundColor } = useLayout();

  return (
    <>
      <div className={`${styles.container} ${backgroundColor}`}>
        <Header />
          <Outlet></Outlet>
        <Footer />
      </div>
    </>
  );
});

export default Layout;