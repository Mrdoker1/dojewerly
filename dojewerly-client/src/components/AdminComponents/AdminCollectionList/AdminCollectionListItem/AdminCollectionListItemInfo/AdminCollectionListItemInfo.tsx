import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductImage from '../../../../Image/ProductImage/ProductImage';
import { Collection } from '../../../../../app/reducers/collectionsSlice';
import { fetchAllProducts, Product } from '../../../../../app/reducers/productsSlice'; // Импортируйте ваш редьюсер продуктов
import styles from './AdminCollectionListItemInfo.module.css';
import { AppDispatch } from '../../../../../app/store';

interface AdminCollectionListItemInfoProps {
  collection: Collection;
  onlyProducts?: boolean;
  productsToShow?: number;
}

const AdminCollectionListItemInfo: React.FC<AdminCollectionListItemInfoProps> = ({ collection, onlyProducts, productsToShow = 5}) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: any) => state.products.products); // Укажите правильный тип состояния

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchAllProducts({})); // Загружаем все продукты
    }
  }, [dispatch, products]);

  // Находим продукты коллекции по их ID
  const collectionProducts: Product[] = products.filter((product: Product) => collection.productIds.includes(product._id || ''));

  const ProductsList = (
    <div className={styles.productImagesContainer}>
    {collectionProducts.slice(0, productsToShow).map((product) => (
      <ProductImage
        key={product._id || ''}
        imageUrl={product.imageURLs[0]} // Берем первое изображение
        alt={product.name}
        className={styles.productImage}
      />
    ))}
    {collection.productIds.length > productsToShow && (
      <div className={styles.overflowSquare}>
        +{collection.productIds.length - productsToShow}
      </div>
    )}
  </div>
  )

  return (
    onlyProducts ? 
    ProductsList :
    <div className={styles.collectionInfo}>
      <h3 className={styles.collectionName}>{collection.name}</h3>
      <p className={styles.collectionDescription}>{collection.description}</p>
      {ProductsList}
    </div>
  );
};

export default AdminCollectionListItemInfo;