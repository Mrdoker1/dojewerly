import React, { memo } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Filters from '../../components/Catalog/Filters/Filters';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import styles from './CatalogPage.module.css';

const CatalogPage = memo(() => {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.heading}>
          <Breadcrumbs />
          <h1>Catalog</h1>
        </div>
        <Filters />
        <ProductList />
      </main>
    </>
  );
});

export default CatalogPage;