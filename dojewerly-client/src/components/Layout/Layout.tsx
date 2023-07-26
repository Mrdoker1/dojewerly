import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

const Layout = memo(() => {

  return (
    <>
      <Header />
        <Outlet></Outlet>
      <Footer />
    </>
  );
});

export default Layout;