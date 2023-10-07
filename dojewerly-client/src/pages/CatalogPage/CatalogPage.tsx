import React, { memo } from 'react';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Filters from '../../components/Catalog/Filters/Filters';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import styles from './CatalogPage.module.css';
import { useTranslation } from 'react-i18next';

const CatalogPage = memo(() => {
  const { t } = useTranslation();
  
  return (
    <>
      <main className={styles.container}>
        <div className={styles.heading}>
          <Breadcrumbs />
          <h1>{t('Catalog')}</h1>
        </div>
        <Filters />
        <ProductList />
      </main>
    </>
  );
});

export default CatalogPage;