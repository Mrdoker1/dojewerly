import React, { memo } from 'react';
import styles from './SignInPage.module.css';
import variables from '../../variables.module.css'
import SignInForm from '../../components/Auntefication/SignInForm';
import Button from '../../components/Button/Button';
import banner from '../../assets/images/banner-1.jpg';
import { Link } from 'react-router-dom';

const SignInPage = memo(() => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
            <img src={banner} alt="Banner" /> {/* Добавьте элемент img */}
        </div>
        <div className={styles.form}>
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