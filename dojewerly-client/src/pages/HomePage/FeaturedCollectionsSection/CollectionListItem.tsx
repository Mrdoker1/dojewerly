import React from 'react';
import styles from './CollectionListItem.module.css';
import GradientImage from '../../../components/Image/GradientImage/GradientImage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import AdminCollectionListItemInfo from '../../../components/AdminComponents/AdminCollectionList/AdminCollectionListItem/AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import ProductImage from '../../../components/Image/ProductImage/ProductImage';

export interface CollectionListItemProps {
  collection: {
    _id: string;
    name: string;
    description: string;
    productIds: string[];
    imageURLs?: string[];
  };
}


const CollectionListItem: React.FC<CollectionListItemProps> = ({ collection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const allProducts = useSelector((state: RootState) => state.products.products);
  const firstProductImage = React.useMemo(() => {
  const firstProductId = collection.productIds[0];
  const firstProduct = allProducts.find(product => product._id === firstProductId);
  return firstProduct?.imageURLs[0] || '';
}, [collection, allProducts]);

  const handleSelectCollection = () => {
  };

return (
  <div className={styles.container} onClick={handleSelectCollection}>
      <ProductImage
              key={collection._id}
              imageUrl={firstProductImage} // Берем первое изображение
              alt={collection.name}
              className={styles.collectionPreview}
      />
    <div className={styles.collectionData}>
      <div className={styles.collectionName}>{collection.name}</div>
      {/* <div className={styles.collectionDescription}>{collection.description}</div> */}
      <AdminCollectionListItemInfo collection={collection} onlyProducts productsToShow={4}/>
    </div>
  </div>
);

  // return (
  //   <div className={styles.container} onClick={handleSelectCollection}>
  //     <div className={styles.gradientImageContainer}>
  //       <GradientImage imageUrl={firstProductImage} alt="Collection Image" />
  //     </div>
  //       <AdminCollectionListItemInfo collection={collection} />
  //   </div>
  // );
};

export default CollectionListItem;
