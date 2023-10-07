import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import styles from './ShareWishlistBlock.module.css';
import { sendNotification } from '../../../components/NotificationCenter/notificationHelpers';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface ShareBlockProps {
  userId: string;
}

const ShareWishlistBlock: React.FC<ShareBlockProps> = ({ userId }) => {
  const shareLink = `http://localhost:3000/favourites/${userId}`;
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      sendNotification(dispatch, 'success', 'Link copied successfully!');
    });
  };

  return (
    <div className={styles.shareBlock}>
      <div className={styles.section}>
        <h2>{t('Share Your Wishlist')}</h2>
        <p className={styles.description}>{t('You can share your list of favorites with friends and colleagues')}</p>
      </div>
      <div className={styles.section}>
        <Input value={shareLink} readOnly />
        <Button onClick={handleCopyClick} variant="secondary" text={t('COPY')} iconRight='copy' fullWidth={true}/>
      </div>
    </div>
  );
};

export default ShareWishlistBlock;