import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToFavourites, fetchAllFavourites, removeProductFromFavourites } from '../../../app/reducers/favouritesSlice';
import { AppDispatch, RootState } from '../../../app/store';
import ProductImage from '../../Image/ProductImage/ProductImage';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import icons from '../../../assets/icons/icons';
import { sendNotification } from '../../NotificationCenter/notificationHelpers';
import { getUserProfile } from '../../../app/reducers/userSlice';

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
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.user.user);
  const [isFavourite, setIsFavourite] = useState(user?.favorites.includes(product._id) || false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFavourite(user?.favorites.includes(product._id) || false);
  }, [user, product._id]);

  const toggleFavourite = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLoading) return; // Если данные загружаются, ничего не делаем
    
    setIsLoading(true);
    
    if (token) {
      try {
        await dispatch(getUserProfile()).unwrap();
      } catch (error) {
        // Обработка ошибок
      }
    }
    
    if (isFavourite) {
      try {
        await dispatch(removeProductFromFavourites(product._id)).unwrap();
        sendNotification(dispatch, 'success', 'Product removed from favourites!');
        setIsFavourite(false);
      } catch (error) {
        sendNotification(dispatch, 'error', 'Failed to remove product from favourites.');
      }
    } else {
      try {
        await dispatch(addProductToFavourites(product._id)).unwrap();
        sendNotification(dispatch, 'success', 'Product added to favourites!');
        setIsFavourite(true);
      } catch (error) {
        sendNotification(dispatch, 'error', 'Failed to add product to favourites.');
      }
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.productCard}>
      <Link key={product._id} to={`/product/${product._id}`}>
        <div className={styles.image}>
          <ProductImage 
            imageUrl={product.imageURLs[0]} 
            alt={product.props.info}
            className={styles.image}
            defaultImage='noImageL'
          />
          <div 
              className={`${styles.favouriteIcon} ${isFavourite ? styles.filled : ''} ${isLoading ? styles.loading : ''}`} 
              onClick={toggleFavourite}
          >
              <icons.heart />
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.info}>{product.props.info}</div>
          <div className={styles.price}>${product.price.toFixed(2)}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
