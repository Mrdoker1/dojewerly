import React, { memo, useEffect } from 'react';
import styles from './SignInPage.module.css';
import variables from '../../variables.module.css'
import SignInForm from '../../components/Auntefication/SignInForm';
import Button from '../../components/Button/Button';
import banner from '../../assets/images/banner-1.jpg';
import { Link } from 'react-router-dom';
import icons from '../../assets/icons/icons';
import { useLayout } from '../../components/Layout/LayoutContext/LayoutContext';

const SignInPage = memo(() => {
  const { setBackgroundColor } = useLayout();

  useEffect(() => {
    setBackgroundColor(styles.background); // Или любой другой цвет
    return () => {
      setBackgroundColor(''); // Возвращаем к дефолтному цвету при анмаунте
    };
  }, [setBackgroundColor]);

  return (
    <>
      <div className={styles.container}>
          <div className={styles.imageContainer}>
              <img src={banner} alt="Banner" /> {/* Добавьте элемент img */}
          </div>
          <div className={styles.form}>
            <icons.logoText className={styles.logo} />
            <div className={styles.heading}>
              <h1>Hello, Let's Sign In</h1>
              <div
                className={variables.description}
                style={{color: 'var(--grey-1)'}}>
                  Please sign in to your DoJewerly Account.
                </div>
            </div>
            <SignInForm />
            <Link to="/signup">
              <Button
                type="button"
                variant="text"
                size="default"
                fullWidth={true} 
                text="CREATE NEW ACCOUNT"
                iconRight="arrowRight"/>
            </Link>
          </div>
      </div>
    </>
  );
});

export default SignInPage;