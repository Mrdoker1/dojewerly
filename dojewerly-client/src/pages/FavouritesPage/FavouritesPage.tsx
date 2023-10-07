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

  const currentCurrency = useSelector((state: RootState) => state.currency.currentCurrency);

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
        product={product} // Передаем целый объект продукта
        onRemove={handleRemoveFromFavourites} // Передаем функцию удаления продукта
      />
    ))}
  </div>
);
};

export default FavouritesPage;