import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css'

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const filters = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    dispatch(fetchAllProducts(filters));
  }, [dispatch, filters]);

  return (
    <div className={styles.container}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;