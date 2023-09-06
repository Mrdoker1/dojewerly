import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCollections, createCollection } from '../../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import AdminCollectionListItem from './AdminCollectionListItem/AdminCollectionListItem';

const AdminCollectionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collectionList = useSelector((state: RootState) => state.collections.collections);

  const handleCreateNewCollection = () => {
    const newCollection = {
      name: 'New Collection',
      description: '',
      productIds: [],
    };

    dispatch(createCollection(newCollection)).then(() => {
      dispatch(fetchAllCollections());
    });
  };

  useEffect(() => {
    dispatch(fetchAllCollections());
  }, [dispatch]);

  if (!collectionList || collectionList.length === 0) {
    return <div>Loading collections...</div>;
  }

  return (
    <div>
      <button onClick={handleCreateNewCollection}>Create new collection</button>
      {collectionList.map((collection) => (
      <AdminCollectionListItem key={collection._id} collection={collection} /> ))}
    </div>
  );
};

export default AdminCollectionList;