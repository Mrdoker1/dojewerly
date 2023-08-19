import React, { memo, useState } from 'react';
import styles from './SignUpForm.module.css';
import variables from '../../variables.module.css';
import Input from '../Input/Input'
import Button from '../Button/Button';
import SocialButtons from '../SocialButtons/SocialButtons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { registerUser } from '../../app/reducers/authSlice';
import NotificationMessage from '../Messages/NotificationMessage/NotificationMessage';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../Input/PasswordInput/PasswordInput';

const SignUpForm = memo(() => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation of fields before sending data
    if (username.trim() === '') {
      setIsUsernameValid(false);
      return;
    }

    if (password.trim() === '') {
      setIsPasswordValid(false);
      return;
    }

    // Dispatch the registerUser action
    dispatch(registerUser({ username, password })).then((result) => {
      console.log('Create account:', result.meta.requestStatus);
      if (result.meta.requestStatus === 'fulfilled') {
        navigate("/dashboard/profile"); // Используйте navigate для перенаправления на страницу /dashboard
      }
    });
  };

  return (
    <>
        <form className={styles.container} onSubmit={handleSubmit}>
          <Input 
            type="text"
            label="Email Address"
            value={username}
            placeholder='your@email.com'
            hasError={!isUsernameValid}
            message={!isUsernameValid ? 'Please enter a valid email.' : ''}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameValid(true); // Reset the error flag when the user starts typing in the field
            }}
          />
          <PasswordInput
            label="Password"
            value={password}
            placeholder="Enter password"
            hasError={!isPasswordValid}
            message={!isPasswordValid ? 'Please enter a valid password.' : ''}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(true);
            }}
          />
          <div className={styles.buttonsContainer}>
            <Button
              type="submit"
              size="small"
              fullWidth={true}
              text="CREATE NEW ACCOUNT"/>
            <div
              className={variables.description}
              style={{color: 'var(--grey-2)'}}>
              Or register using
            </div>
            {auth.error && <NotificationMessage type="error" key={Date.now()} message={auth.error} iconRight='close' />}
            <SocialButtons />
          </div>
        </form>
    </>
  );
});

export default SignUpForm;