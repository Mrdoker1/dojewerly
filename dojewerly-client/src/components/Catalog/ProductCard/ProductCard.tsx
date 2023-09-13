import React from 'react';
import ProductImage from '../../Image/ProductImage/ProductImage';
import styles from './ProductCard.module.css'; // Импортируем CSS-модуль

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    imageURLs: string[];
    props: {
      info: string;
    };
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.image}>
      <ProductImage 
          imageUrl={product.imageURLs[0]} 
          alt={product.props.info}
          className={styles.image} // Передаем стиль в ProductImage
          defaultImage='noImageL'
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.info}>{product.props.info}</div>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;