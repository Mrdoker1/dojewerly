import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FavouriteProductCard from '../../components/Favourites/FavouriteProductCard/FavouriteProductCard';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserFavourites } from '../../app/reducers/favouritesSlice';
import styles from './SharedFavouritesPage.module.css';

const SharedFavouritesPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const favouriteProducts = useSelector((state: RootState) => state.favourites.favouriteProducts);
  const fetchStatus = useSelector((state: RootState) => state.favourites.status);

  const [userFound, setUserFound] = useState(true);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserFavourites(userId)).then((action) => {
        if (fetchUserFavourites.rejected.match(action)) {
          setUserFound(false);
        }
      });
    }
  }, [dispatch, userId]);

  if (!userFound) {
    return <div className={styles.container}>User not found.</div>;
  }

  if (fetchStatus === 'loading') {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      {favouriteProducts.map(product => (
        <FavouriteProductCard
          key={product._id}
          product={product}
          onRemove={() => {}}
        />
      ))}
    </div>
  );
};

export default SharedFavouritesPage;