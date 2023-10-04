import React from 'react';
import styles from './CollectionListItem.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import AdminCollectionListItemInfo from '../../../components/AdminComponents/AdminCollectionList/AdminCollectionListItem/AdminCollectionListItemInfo/AdminCollectionListItemInfo';
import ProductImage from '../../../components/Image/ProductImage/ProductImage';
import { useNavigate } from 'react-router-dom';
import { Collection } from '../../../app/reducers/collectionsSlice';

export interface CollectionListItemProps {
  collection: Collection
}


const CollectionListItem: React.FC<CollectionListItemProps> = ({ collection }) => {
  const navigate = useNavigate();
  const allProducts = useSelector((state: RootState) => state.products.products);
  const firstProductImage = React.useMemo(() => {
  const firstProductId = collection.productIds[0];
  const firstProduct = allProducts.find(product => product._id === firstProductId);
  return firstProduct?.imageURLs[0] || '';
}, [collection, allProducts]);

  const handleSelectCollection = () => {
    navigate(`/collections/${collection._id}`); // Используйте navigate для перенаправления на страницу /dashboard
  };

return (
  <div className={styles.container} onClick={handleSelectCollection}>
      {/* <ProductImage
              key={collection._id}
              imageUrl={firstProductImage} // Берем первое изображение
              alt={collection.name}
              className={styles.collectionPreview}
      /> */}
    <div className={styles.collectionData}>
      <div className={styles.collectionName}>{collection.name}</div>
      <AdminCollectionListItemInfo collection={collection} onlyProducts productsToShow={4}/>
    </div>
  </div>
)};

export default CollectionListItem;
