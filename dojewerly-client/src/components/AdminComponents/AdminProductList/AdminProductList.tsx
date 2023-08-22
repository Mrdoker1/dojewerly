import React, { useEffect } from 'react';
import AdminProductListItem from './AdminProductListItem/AdminProductListItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../../app/reducers/productsSlice';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminProductList.module.css'; // Импортируем стили

const AdminProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productList = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  // Проверка, загружены ли продукты
  if (!productList || productList.length === 0) {
    return <div>Loading products...</div>; // Или другой индикатор загрузки
  }

  return (
    <div className={styles.container}> {/* Применяем стили к контейнеру */}
      {productList.map((product, index) => (
        <AdminProductListItem
          key={product._id} // Используем уникальный идентификатор продукта в качестве ключа
          id={product._id}
          name={product.name}
          description={product.props.info}
          price={product.price}
          imageUrl={product.imageURLs[0]}
        />
      ))}
    </div>
  );
};

export default AdminProductList;