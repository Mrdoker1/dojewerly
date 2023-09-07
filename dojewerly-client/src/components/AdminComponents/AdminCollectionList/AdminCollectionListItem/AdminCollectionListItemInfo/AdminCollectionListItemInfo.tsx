import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductImage from '../../../../Product/ProductImage/ProductImage';
import { Collection } from '../../../../../app/reducers/collectionsSlice';
import { fetchAllProducts, Product } from '../../../../../app/reducers/productsSlice'; // Импортируйте ваш редьюсер продуктов
import styles from './AdminCollectionListItemInfo.module.css';
import { AppDispatch } from '../../../../../app/store';
import CollectionImage from '../../../../Collection/CollectionImage/CollectionImage';

interface AdminCollectionListItemInfoProps {
  collection: Collection;
}

const AdminCollectionListItemInfo: React.FC<AdminCollectionListItemInfoProps> = ({ collection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: any) => state.products.products); // Укажите правильный тип состояния

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts({})); // Загружаем все продукты
    }
  }, [dispatch, products]);

  // Находим продукты коллекции по их ID
  const collectionProducts: Product[] = products.filter((product: Product) => collection.productIds.includes(product._id || ''));

  return (
    <>
      {/* <CollectionImage collectionId={collection._id || ''} className={styles.collectionImage}/> */}
      <div className={styles.collectionInfo}>
      <h3 className={styles.collectionName}>{collection.name}</h3>
      <p className={styles.collectionDescription}>{collection.description}</p>
      <div className={styles.productImagesContainer}>
        {collectionProducts.slice(0, 5).map((product) => (
          <ProductImage
            key={product._id || ''}
            imageUrl={product.imageURLs[0]} // Берем первое изображение
            alt={product.name}
            className={styles.productImage}
          />
        ))}
        {collection.productIds.length > 5 && (
          <div className={styles.overflowSquare}>
            +{collection.productIds.length - 5}
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default AdminCollectionListItemInfo;