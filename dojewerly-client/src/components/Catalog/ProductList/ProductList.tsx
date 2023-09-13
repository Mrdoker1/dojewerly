import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { batch, useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchTotalProductsCount } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css'
import Pagination from '../Pagination/Pagination';
import { setFilter } from '../../../app/reducers/catalogSlice';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const filters = useSelector((state: RootState) => state.catalog);
  const navigate = useNavigate();
  const location = useLocation();
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);
  const totalPages = Math.ceil(totalProducts / (filters.limit || 1));

  useEffect(() => {
    console.log('ProductList useEffect triggered', filters); // Этот лог  
    batch(() => {
      dispatch(fetchAllProducts(filters));
      dispatch(fetchTotalProductsCount(filters));
    });
  }, [dispatch, filters]);

  const handlePageChange = (page: number) => {
    dispatch(setFilter({ name: 'page', value: page }));
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', page.toString());
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  };  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.porudctList}>
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className={styles.noProducts}>No products found :( Try changing your search terms.</div>
          )}
        </div>
      </div>
      <Pagination 
        currentPage={Number(filters.page) || 1} 
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ProductList;
