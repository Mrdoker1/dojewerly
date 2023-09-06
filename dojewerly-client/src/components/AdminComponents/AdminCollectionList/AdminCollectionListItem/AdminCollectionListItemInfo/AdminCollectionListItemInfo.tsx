import React from 'react';
import ProductImage from '../../../../Product/ProductImage/ProductImage';
import { Collection } from '../../../../../app/reducers/collectionsSlice';
import styles from './AdminCollectionListItemInfo.module.css';


interface AdminCollectionListItemInfoProps {
  collection: Collection;
}

const AdminCollectionListItemInfo: React.FC<AdminCollectionListItemInfoProps> = ({ collection }) => {
  const maxImagesToShow = 5; // Максимальное количество изображений, которое можно отобразить

  // Находим изображения продуктов по их ID
  const collectionProducts = [{key: '1', imageUrl: '2', alt: '3', _id: ''}];

  return (
    <div className={styles.collectionInfo}>
      <h3 className={styles.collectionName}>{collection.name}</h3>
      <p className={styles.collectionDescription}>{collection.description}</p>
      <div className={styles.productImagesContainer}>
        {collectionProducts.slice(0, maxImagesToShow).map((product, index) => (
          <ProductImage
            key={product?._id || ''}
            imageUrl={product?.imageUrl || ''}
            alt={product?._id || 'Prdouct image'}
            className={styles.productImage}
          />
        ))}
        {collection.productIds.length > maxImagesToShow && (
          <div className={styles.overflowSquare}>
            +{collection.productIds.length - maxImagesToShow}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCollectionListItemInfo;