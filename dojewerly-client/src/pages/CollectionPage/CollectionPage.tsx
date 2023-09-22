import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { useParams } from 'react-router-dom';
import { fetchCollectionById } from '../../app/reducers/collectionsSlice';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import GradientImage from '../../components/Image/GradientImage/GradientImage';
import CollectionProductList from './CollectionProductList/CollectionProductList';
import styles from './CollectionPage.module.css';

const CollectionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const collection = useSelector((state: RootState) => state.collections.collections.find(coll => coll._id === id));
  const allProducts = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    if (!collection && id) {
      dispatch(fetchCollectionById(id));
    }
  }, [id, collection, dispatch]);

  // Находим продукты, которые принадлежат этой коллекции
  const collectionProducts = useMemo(() => {
    return allProducts.filter(product => collection?.productIds.includes(product._id));
  }, [allProducts, collection]);

  // Изображение для фона из первого продукта коллекции
  const firstProductImage = useMemo(() => {
    return collectionProducts.length > 0 ? collectionProducts[0].imageURLs[0] : '';
  }, [collectionProducts]);

  if (!collection) return <div>Loading...</div>;

  return (
    <div className={styles.pageWrapper}>
      <GradientImage imageUrl={firstProductImage} alt={collection.name} className={styles.gradientBackground} />
      <div className={styles.contentWrapper}>
        <Breadcrumbs />
        <h1>{collection.name}</h1>
        <p className={styles.description}>{collection.description}</p>
        <div className={styles.collectionContainer}>
          <CollectionProductList productIds={collection.productIds} />
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
