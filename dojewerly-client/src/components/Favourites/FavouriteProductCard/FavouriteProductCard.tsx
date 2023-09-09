import React from 'react';
import ProductImage from '../../Image/ProductImage/ProductImage';
import styles from './FavouriteProductCard.module.css';
import icons from '../../../assets/icons/icons';

interface FavouriteProductCardProps {
  productId: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  onRemove: (productId: string) => void; // Callback функция для удаления продукта
}

const FavouriteProductCard: React.FC<FavouriteProductCardProps> = ({ productId, name, description, price, imageUrl, onRemove }) => {
  const handleHeartClick = () => {
    onRemove(productId); // Удаляем продукт, используя переданную функцию
  };

  return (
    <div className={styles.card}>
      <div className={styles.infoSection}>
        <div className={styles.titleAndIcon}>
          <h3 className={styles.productName}>{name}</h3>
          <span className={styles.heartIcon} onClick={handleHeartClick}>
            <icons.heart />
          </span>
        </div>
        <p className={styles.productDescription}>{description}</p>
        <p className={styles.productPrice}>{price}</p>
      </div>
      <div className={styles.topSection}></div>
      <div className={styles.imageSection}>
        <ProductImage imageUrl={imageUrl} alt={name} className={styles.productImage} />
      </div>
    </div>
  );
};

export default FavouriteProductCard;