import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import { useLayout } from './LayoutContext/LayoutContext';
import { ModalProvider } from '../Modal/ModalProvider';

const Layout = memo(() => {

  const { backgroundColor } = useLayout();

  return (
    <>
      <div className={`${styles.container} ${backgroundColor}`}>
      <ModalProvider >
        <Header />
            <Outlet></Outlet>
        <Footer />
      </ModalProvider>
      </div>
    </>
  );
});

export default Layout;