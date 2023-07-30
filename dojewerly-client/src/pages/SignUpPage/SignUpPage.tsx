import React, { memo } from 'react';
import styles from './SignUpPage.module.css';
import SignUpForm from '../../components/Auntefication/SignUpForm';
import Button from '../../components/Button/Button';

const SignUpPage = memo(() => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Hello, let's Sign In</h1>
          <div className={styles.description}>Please sign in to your DoJewerly Account.</div>
        </div>
        <SignUpForm />
        <Button type="button" variant="text" size="small" fullWidth={true}  text="CREATE AN ACCOUNT" iconRight="arrowRight"/>
      </div>
    </>
  );
});

export default SignUpPage;