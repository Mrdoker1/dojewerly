import React, { memo } from 'react';
import styles from './SignUpPage.module.css';
import variables from '../../variables.module.css'
import SignUpForm from '../../components/Auntefication/SignUpForm';
import Button from '../../components/Button/Button';
import banner from '../../assets/images/banner-2.jpg';
import { Link } from 'react-router-dom';
import icons from '../../assets/icons/icons';

const SignUpPage = memo(() => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
            <img src={banner} alt="Banner" /> {/* Добавьте элемент img */}
        </div>
        <div className={styles.form}>
          <icons.logoText className={styles.logo} />
          <div className={styles.heading}>
            <h1>Create an Account</h1>
            <div
              className={variables.description}
              style={{color: 'var(--grey-1)'}}>
                Register New DoJeverly Account.
              </div>
          </div>
          <SignUpForm />
          <Link to="/signin">
            <Button
                type="button"
                variant="text"
                size="default"
                fullWidth={true} 
                text="SIGN IN TO ACCOUNT"
                iconRight="arrowRight"/>
          </Link>
        </div>
      </div>
    </>
  );
});

export default SignUpPage;