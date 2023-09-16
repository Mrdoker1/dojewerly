import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollections } from '../../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './FeaturedCollectionsSection.module.css';
import CollectionListItem, { CollectionListItemProps } from './CollectionListItem';
import Button from '../../../components/Button/Button';

const FeaturedCollectionsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collections = useSelector((state: RootState) => state.collections.collections);
  const status = useSelector((state: RootState) => state.collections.status); // Selecting the status

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.collectionsWrapper}>
        <div className={styles.collectionsHeading}>
          <div className={styles.collectionsHeader}>Featured Collections</div>
          <Button 
              text={`SEE ALL (${collections.length})`} 
              variant="text"
              iconRight='arrowRight'
              className={styles.collectionsShowAll}
              onClick={() => {/* TODO: Add functionality here */}}
          />
        </div>
        
        {status === 'loading' && <div className={styles.loadingIndicator}>Загрузка коллекций...</div>}

        {status === 'failed' && <div className={styles.errorIndicator}>Ошибка загрузки коллекций</div>}

        {status === 'succeeded' && 
          <div className={styles.collections}>
            {collections.slice(0, 6).map((collection) => (
                collection ? <CollectionListItem key={collection._id} collection={collection as CollectionListItemProps["collection"]} /> : null
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default FeaturedCollectionsSection;
