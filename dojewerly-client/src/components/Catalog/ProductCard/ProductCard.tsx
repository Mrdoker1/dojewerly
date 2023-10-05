import React from 'react';
import ProductImage from '../../Image/ProductImage/ProductImage';
import FavouriteToggle from '../../Favourites/FavouriteToggle/FavouriteToggle';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

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

  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);

  return (
    <div className={styles.productCard}>
      <Link key={product._id} to={`/product/${product._id}`}>
        <div className={styles.image}>
          <ProductImage 
            imageUrl={product.imageURLs[0]} 
            alt={product.props.info}
            className={styles.image}
            defaultImage='noImageL'
            square
          />
          <FavouriteToggle productId={product._id} className={styles.favouriteIcon}/>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.info}>{product.props.info}</div>
          <div className={styles.price}>{`${product.price.toFixed(2)} ${currentCurrency}`}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
