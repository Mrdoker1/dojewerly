import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollection, Collection } from '../../../../app/reducers/collectionsSlice';
import { selectCollection, deselectCollection } from '../../../../app/reducers/userDashboardSlice';
import { AppDispatch, RootState } from '../../../../app/store';
import AdminCollectionListItemInfo from './AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import styles from './AdminCollectionListItem.module.css';
import icons from '../../../../assets/icons/icons'; 
import { sendNotification } from '../../../NotificationCenter/notificationHelpers';

interface AdminCollectionListItemProps {
  collection: Collection;
}

const AdminCollectionListItem: React.FC<AdminCollectionListItemProps> = ({ collection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
  const TrashIcon = icons.trash;

  const handleSelectCollection = () => {
    if (collection._id) dispatch(selectCollection(collection._id));
  };

  const handleDelete = async () => {
    try {
      if (collection._id) await dispatch(deleteCollection(collection._id)).unwrap() 
      else throw new Error();
      dispatch(deselectCollection());
      sendNotification(dispatch, 'success', 'Collection deleted successfully!');
    } catch (error) {
      sendNotification(dispatch, 'error', 'Failed to delete collection!');
    }
  };

  const containerClassNames = selectedCollectionId === collection._id
    ? `${styles.container} ${styles.selected}`
    : styles.container;

  return (
    <div className={containerClassNames} onClick={handleSelectCollection}>
      <AdminCollectionListItemInfo collection={collection} />
      <TrashIcon onClick={handleDelete} className={styles.deleteIcon} />
    </div>
  );
};

export default AdminCollectionListItem;