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

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  if (!collections || collections.length === 0) {
    return <div>Loading collections...</div>;
  }

  return (
    <div className={styles.container}>
        <div className={styles.collectionsWrapper}>
          <div className={styles.collectionsHeading}>
              <div className={styles.collectionsHeader}>Featured Collections</div>
              <Button 
                  text={`SEE ALL (${collections.length})`} 
                  variant="text"
                  className={styles.collectionsShowAll}
                  onClick={() => {/* TODO: Add functionality here */}}
              />
          </div>
        <div className={styles.collections}>
          {collections.slice(0, 6).map((collection) => (
              collection ? <CollectionListItem key={collection._id} collection={collection as CollectionListItemProps["collection"]} /> : null
          ))}
        </div>
        </div>
    </div>
  );
};

export default FeaturedCollectionsSection;
