import React from 'react';
import styles from './CollectionCreationPage.module.css';
import AdminCollectionList from '../../components/AdminComponents/AdminCollectionList/AdminCollectionList';
import AdminCollectionDetails from '../../components/AdminComponents/AdminCollectionDetails/AdminCollectionDetails';

const CollectionCreationPage = () => {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
            <AdminCollectionDetails />
            <AdminCollectionList />
        </div>
      </div>
    );
  };

export default CollectionCreationPage;