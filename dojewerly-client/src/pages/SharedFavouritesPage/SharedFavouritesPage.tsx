import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { fetchUserFavourites } from '../../app/reducers/favouritesSlice';
import styles from './SharedFavouritesPage.module.css';
import { getUserPublicInfo } from '../../app/reducers/userSlice';
import ProductCard from '../../components/Catalog/ProductCard/ProductCard';
import { useTranslation } from 'react-i18next';

const SharedFavouritesPage: React.FC = () => {
  const { t } = useTranslation();
  const { userId } = useParams<{ userId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const favouriteProducts = useSelector((state: RootState) => state.favourites.favouriteProducts);
  const fetchStatus = useSelector((state: RootState) => state.favourites.status);
  const userName = useSelector((state: RootState) => state.user.user?.username);

  const [userFound, setUserFound] = useState(true);

  useEffect(() => {
    if (userId) {
      dispatch(getUserPublicInfo(userId));
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
    <div className={styles.heading}>
        <span className={styles.username}>{userName}</span> <span>{t('has shared their favorites with you!')}</span>
    </div>
    <div className={styles.productWrapper}>
      {favouriteProducts.map(product => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
    </div>
  </div>
  );  
};

export default SharedFavouritesPage;