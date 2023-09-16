import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { batch, useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchTotalProductsCount } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css'
import Pagination from '../Pagination/Pagination';
import { setFilter } from '../../../app/reducers/catalogSlice';
import { getUserProfile } from '../../../app/reducers/userSlice';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const status = useSelector((state: RootState) => state.catalogCriteria.status);
  const filters = useSelector((state: RootState) => state.catalog);
  const navigate = useNavigate();
  const location = useLocation();
  const totalProducts = useSelector((state: RootState) => state.products.totalProducts);
  const totalPages = Math.ceil(totalProducts / (filters.limit || 1));
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    console.log('ProductList useEffect triggered', filters); // Этот лог
    if (token) {
      try {
        dispatch(getUserProfile()).unwrap();
      } catch (error) {
        // Обработка ошибок
      }
    }
    batch(() => {
      dispatch(fetchAllProducts(filters));
      dispatch(fetchTotalProductsCount(filters));
    });
  }, [dispatch, filters, token]);

  const handlePageChange = (page: number) => {
    window.scrollTo(0, 0); // сброс позиции скролла к верху страницы
    dispatch(setFilter({ name: 'page', value: page }));
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', page.toString());
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  };  

  let content;
  if (status === 'loading') {
    content = (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </>
    );
  } else if (status === 'failed') {
    content = <div className={styles.errorIndicator}>Ошибка загрузки продуктов</div>;
  } else if (products.length > 0) {
    content = products.map(product => (
      <ProductCard key={product._id} product={product} />
    ));
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productList}>
          {content}
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
