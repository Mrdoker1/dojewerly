import React from 'react';
import { Collection } from '../../../../app/reducers/collectionsSlice';
import AdminCollectionListItemInfo from './AdminCollectionListItemInfo/AdminCollectionListItemInfo';

interface AdminCollectionListItemProps {
  collection: Collection;
}

const AdminCollectionListItem: React.FC<AdminCollectionListItemProps> = ({ collection }) => {
  return (
    <div>
      <AdminCollectionListItemInfo collection={collection} />
      {/* Add delete or edit actions here */}
    </div>
  );
};

export default AdminCollectionListItem;