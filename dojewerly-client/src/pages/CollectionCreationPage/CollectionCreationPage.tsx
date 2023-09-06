import React from 'react';
import styles from './CollectionCreationPage.module.css';
import AdminCollectionList from '../../components/AdminComponents/AdminCollectionList/AdminCollectionList';

const CollectionCreationPage = () => {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
            <AdminCollectionList />
        </div>
      </div>
    );
  };

export default CollectionCreationPage;