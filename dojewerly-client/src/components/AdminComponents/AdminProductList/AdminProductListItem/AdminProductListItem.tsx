import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../../../app/reducers/productsSlice';
import { addNotification } from '../../../../app/reducers/notificationSlice'; // Импортируйте экшн
import { AppDispatch, RootState } from '../../../../app/store';
import styles from './AdminProductListItem.module.css';
import icons from '../../../../assets/icons/icons';
import { deselectProduct, selectProduct } from '../../../../app/reducers/userDashboardSlice';
import ProductImage from '../../../Product/ProductImage/ProductImage';

interface AdminProductListItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const AdminProductListItem: React.FC<AdminProductListItemProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const TrashIcon = icons.trash;

  const handleSelectProduct = () => {
    dispatch(selectProduct(id)); // Вызов действия для установки выбранного продукта
  };

  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);

  const containerClassNames = selectedProductId === id
  ? `${styles.container} ${styles.selected}`
  : styles.container;

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(deselectProduct());
      // Отправляем успешное уведомление
      dispatch(addNotification({
        id: Date.now(),
        type: 'success',
        message: 'Product deleted successfully!',
        iconRight: 'close', // Иконка для закрытия
        timeout: 3000, // Время жизни уведомления
      }));
    } catch (error) {
      // Отправляем уведомление об ошибке
      dispatch(addNotification({
        id: Date.now(),
        type: 'error',
        message: 'Failed to delete product!',
        iconRight: 'close', // Иконка для закрытия
        timeout: 3000, // Время жизни уведомления
      }));
    }
  };

  return (
    <div className={containerClassNames} onClick={handleSelectProduct}>
      <ProductImage
        imageUrl={imageUrl} // Теперь передаём только имя файла изображения
        alt={name}
        className={styles.image}
      />
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{name}</h3>
        <p className={styles.productDescription}>{description}</p>
        <p className={styles.productPrice}>{price.toFixed(2)} $</p>
      </div>
      <TrashIcon onClick={handleDelete} className={styles.deleteIcon} />
    </div>
  );
};

export default AdminProductListItem;