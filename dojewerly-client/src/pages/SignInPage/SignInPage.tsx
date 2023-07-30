import React, { memo } from 'react';
import styles from './SignInPage.module.css';
import variables from '../../variables.module.css'
import SignInForm from '../../components/Auntefication/SignInForm';
import Button from '../../components/Button/Button';

const SignInPage = memo(() => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Hello, Let's Sign In</h1>
          <div
            className={variables.description}
            style={{color: 'var(--grey-1)'}}>
              Please sign in to your DoJewerly Account.
            </div>
        </div>
        <SignInForm />
        <Button
          type="button"
          variant="text"
          size="small"
          fullWidth={true} 
          text="CREATE AN ACCOUNT"
          iconRight="arrowRight"/>
      </div>
    </>
  );
});

export default SignInPage;