import React from 'react';
import styles from '../Modal/Modal.module.css';
import Button from '../../components/Button/Button';
import icons from '../../assets/icons/icons';

interface AuthProps {
  bannerImage?: string;
  heading: string;
  description: string;
  mainForm: React.ReactNode;
  buttonText: string;
  buttonIcon: keyof typeof icons;
  buttonOnClick: () => void;
}

const Auth: React.FC<AuthProps> = ({
  bannerImage,
  heading,
  description,
  mainForm,
  buttonText,
  buttonIcon,
  buttonOnClick,
}) => {
  return (
    <div className={styles.container}>
      {bannerImage &&
        <div className={styles.imageContainer}>
          <img src={bannerImage} alt="Banner" />
        </div>}
      <div className={styles.form}>
        <icons.logoText className={styles.logo} />
        <div className={styles.heading}>
          <h1>{heading}</h1>
          <div className={styles.description}>
            {description}
          </div>
        </div>
        {mainForm}
        <Button
          type="button"
          variant="text"
          size="default"
          fullWidth={true} 
          text={buttonText}
          iconRight={buttonIcon}
          onClick={buttonOnClick}
        />
      </div>
    </div>
  );
}

export default Auth;
