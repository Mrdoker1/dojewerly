import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFavourites, removeProductFromFavourites } from '../../app/reducers/favouritesSlice';
import FavouriteProductCard from '../../components/Favourites/FavouriteProductCard/FavouriteProductCard';
import styles from './FavouritesPage.module.css';
import { AppDispatch, RootState } from '../../app/store';
import { sendNotification } from '../../components/NotificationCenter/notificationHelpers';
import ShareWishlistBlock from './ShareWishlistBlock/ShareWishlistBlock';

const FavouritesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Получаем полную информацию о продуктах
  const favouriteProducts = useSelector((state: RootState) => state.favourites.favouriteProducts);
  const user = useSelector((state: RootState) => state.user.user);
  const userId = user?._id;

  useEffect(() => {
    dispatch(fetchAllFavourites());
  }, [dispatch]);

  // Функция для удаления продукта из избранного
  const handleRemoveFromFavourites = (productId: string) => {
    dispatch(removeProductFromFavourites(productId))
    .then(resultAction => {
        if (removeProductFromFavourites.fulfilled.match(resultAction)) {
          sendNotification(dispatch, 'success', 'Product removed from favourites!');
        } else {
          sendNotification(dispatch, 'error', 'Failed to remove product from favourites.');
        }
    });
};

  return (
    <div className={styles.container}>
      <ShareWishlistBlock userId={userId || ''} />
      {favouriteProducts.map(product => (
        <FavouriteProductCard
          key={product._id}
          productId={product._id}
          name={product.name}
          description={product.props.info}
          price={`${product.price.toFixed(2)} $`}
          imageUrl={product.imageURLs[0]} // Предполагаем, что первое изображение - основное
          onRemove={handleRemoveFromFavourites} // Передаем функцию удаления продукта
        />
      ))}
    </div>
  );
};

export default FavouritesPage;