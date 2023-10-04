import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollections, createCollection } from '../../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminCollectionList.module.css'
import AdminCollectionListItem from './AdminCollectionListItem/AdminCollectionListItem';
import CreateItemButton from '../AdminProductList/CreateItemButton/CreateItemButton';
import { selectCollection } from '../../../app/reducers/userDashboardSlice';

const AdminCollectionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collectionList = useSelector((state: RootState) => state.collections.collections);

  const handleCreateNewCollection = () => {
    const newCollection = {
      name: 'New Collection',
      description: 'Collection Description',
      productIds: [],
      localization: {}
    };

    dispatch(createCollection(newCollection))
    .then(response => {
      dispatch(fetchAllCollections());
      dispatch(selectCollection(response.payload._id));
    });
  };

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  if (!collectionList || collectionList.length === 0) {
    return <div>Loading collections...</div>;
  }

  return (
    <div className={styles.container}>
      <CreateItemButton title={'Create new Collection'} onClick={handleCreateNewCollection}/>
      {collectionList.map((collection) => (
      <AdminCollectionListItem key={collection._id} collection={collection} /> ))}
    </div>
  );
};

export default AdminCollectionList;