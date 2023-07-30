import React, { memo, useState } from 'react';
import cl from './SignUp.module.css';
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button';

const SignUp = memo(() => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

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

    // If all fields are filled, you can send data to the server or perform other actions
    console.log('Submitted:', { username, password });
    // Then, you could send the data to the server to check the user's login or perform another logic.
  };

  return (
    <>
      <div className={cl.container}>
        <h1>Welcome back! *Username*</h1>
        <div className={cl.description}>Please register or sign in.</div>

        <form onSubmit={handleSubmit}>
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

          <Input 
            type="password"
            label="Password"
            value={password}
            placeholder='Enter password'
            hasError={!isPasswordValid}
            message={!isPasswordValid ? 'Please enter a valid password.' : ''}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsPasswordValid(true); // Reset the error flag when the user starts typing in the field
            }}
          />

        <Button type="submit" size="small" fullWidth={true}  text="SIGN IN" />
        </form>
        <Button type="button" variant="text" size="small" fullWidth={true}  text="CREATE AN ACCOUNT" iconRight="arrowRight"/>
      </div>
    </>
  );
});

export default SignUp;