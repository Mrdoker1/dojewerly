import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { updateUserProfile } from '../../app/reducers/userSlice';
import { addNotification } from '../../app/reducers/notificationSlice'; // Импортируйте экшн
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './ProfileForm.module.css';
import PasswordInput from '../Input/PasswordInput/PasswordInput';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const [username, setUsername] = useState(user?.username || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');

  useEffect(() => {
    setUsername(user?.username || '');
  }, [user]);

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (e.target.value === confirmPassword && passwordMismatchError) {
      setPasswordMismatchError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === newPassword && passwordMismatchError) {
      setPasswordMismatchError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordMismatchError('Passwords do not match');
        return;
      }
    }

    const updateData: any = {
      username,
    };

    if (newPassword) {
      updateData.password = newPassword;
    }

    dispatch(updateUserProfile(updateData))
    .then((result) => {
      if (updateUserProfile.fulfilled.match(result)) {
        // Отправляем успешное уведомление
        dispatch(addNotification({
          id: Date.now(),
          type: 'success',
          message: 'Profile updated successfully!',
          iconRight: 'close', // Иконка для закрытия
          timeout: 3000, // Время жизни уведомления
        }));
      } else if (updateUserProfile.rejected.match(result)) {
        // Отправляем уведомление об ошибке
        dispatch(addNotification({
          id: Date.now(),
          type: 'error',
          message: result.error.message || 'Something went wrong',
          iconRight: 'close', // Иконка для закрытия
          timeout: 3000, // Время жизни уведомления
        }));
      }
    })
    .catch((error) => {
      // Отправляем уведомление об ошибке
      dispatch(addNotification({
        id: Date.now(),
        type: 'error',
        message: error.message || 'Something went wrong',
        iconRight: 'close', // Иконка для закрытия
        timeout: 3000, // Время жизни уведомления
      }));
    });
  };

  return (
    <div className={styles.info}>
      <h2>Your Information</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Email Address"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          label="Password"
          value={newPassword}
          placeholder="Enter new password"
          onChange={handleNewPasswordChange}
          hasError={!!passwordMismatchError}
          message={passwordMismatchError}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          placeholder="Enter new password"
          onChange={handleConfirmPasswordChange}
          hasError={!!passwordMismatchError}
          message={passwordMismatchError}
        />
        <Button type="submit" variant="secondary">Save</Button>
      </form>
    </div>
  );
};

export default ProfileForm;