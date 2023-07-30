import React, { memo } from 'react';
import cl from './SignUp.module.css';
import SignUpForm from '../../components/Auntefication/SignInForm';

const SignUp = memo(() => {

  return (
    <>
      <div className={cl.container}>
        <h1>Welcome back! *Username*</h1>
        <div className={cl.description}>Please register or sign in.</div>
        <SignUpForm />
      </div>
    </>
  );
});

export default SignUp;