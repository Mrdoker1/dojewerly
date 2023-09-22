import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollections } from '../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../app/store';
import styles from './CollectionsPage.module.css';
import CollectionListItem, { CollectionListItemProps } from './CollectionListItem/CollectionListItem';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

const CollectionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collections = useSelector((state: RootState) => state.collections.collections);
  const status = useSelector((state: RootState) => state.collections.status); // Selecting the status

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <Breadcrumbs />
        <h1>Collections</h1>
      </div>
      
      {status === 'loading' && <div className={styles.loadingIndicator}>Загрузка коллекций...</div>}

      {status === 'loading' && 
        <div className={styles.collections}>
          {Array.from({ length: 6 }).map((_, index) => (
                <></>
          ))}
        </div>
      }

      {status === 'failed' && <div className={styles.errorIndicator}>Ошибка загрузки коллекций</div>}

      {status === 'succeeded' && 
        <div className={styles.collections}>
          {collections.map((collection) => (
            collection ? <CollectionListItem key={collection._id} collection={collection as CollectionListItemProps["collection"]} /> : null
          ))}
        </div>
      }
    </div>
  );
};

export default CollectionsPage;
