import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../../components/Auntefication/Forms/SignInForm/SignInForm';
import banner from '../../assets/images/banner-1.jpg';
import { useLayout } from '../../components/Layout/LayoutContext/LayoutContext';
import styles from './Auth.module.css'; // используйте один и тот же файл стилей
import AuthPage from '../../components/Auntefication/Auth';

const SignInPage: React.FC = () => {
  const { setBackgroundColor } = useLayout();
  const navigate = useNavigate();

  useEffect(() => {
    setBackgroundColor(styles.background);
    return () => {
      setBackgroundColor('');
    };
  }, [setBackgroundColor]);

  return (
    <AuthPage
      bannerImage={banner}
      heading="Hello, Let's Sign In"
      description="Please sign in to your DoJewerly Account."
      mainForm={<SignInForm />}
      buttonText="CREATE NEW ACCOUNT"
      buttonIcon="arrowRight"
      buttonOnClick={() => navigate("/signup")}
    />
  );
}

export default SignInPage;
