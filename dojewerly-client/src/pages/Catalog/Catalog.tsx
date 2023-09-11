import React, { memo } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Filters from '../../components/Catalog/Filters/Filters';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import styles from './Catalog.module.css';

const Catalog = memo(() => {
  return (
    <>
      <main className={styles.container}>
        <Breadcrumbs />
        <h1>Catalog</h1>
        <Filters />
        <ProductList />
      </main>
    </>
  );
});

export default Catalog;