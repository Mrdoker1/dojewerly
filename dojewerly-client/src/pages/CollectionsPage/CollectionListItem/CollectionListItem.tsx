import React from 'react';
import styles from './CollectionListItem.module.css';
import AdminCollectionListItemInfo from '../../../components/AdminComponents/AdminCollectionList/AdminCollectionListItem/AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import icons from '../../../assets/icons/icons';
import { Link } from 'react-router-dom';
import { Collection } from '../../../app/reducers/collectionsSlice';

export interface CollectionListItemProps {
  collection: Collection;
}

const CollectionListItem: React.FC<CollectionListItemProps> = ({ collection }) => {

return (
  <Link key={collection._id} to={`/collections/${collection._id}`} className={styles.container}>
      <div className={styles.heading}>
        <h2 className={styles.name}>{collection.name}</h2>
        <icons.arrowRight></icons.arrowRight>
      </div>
      <div className={styles.description}>{collection.description}</div> 
      <AdminCollectionListItemInfo collection={collection} onlyProducts productsToShow={4}/>
  </Link>
)};

export default CollectionListItem;
