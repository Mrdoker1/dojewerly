import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../app/reducers/productsSlice';
import { addNotification } from '../../../app/reducers/notificationSlice'; // Импортируйте экшн
import { AppDispatch } from '../../../app/store';
import styles from './AdminProductListItem.module.css';
import icons from '../../../assets/icons/icons';
import noImageIcon from '../../../assets/icons/no-image-S.svg';

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
  const TrashIcon = icons['trash'];

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = noImageIcon;
  };

  return (
    <div className={styles.container}>
      <img
        src={imageUrl || noImageIcon}
        alt={name}
        className={styles.image}
        onError={handleImageError}
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