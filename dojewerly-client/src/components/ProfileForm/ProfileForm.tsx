import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { updateUserProfile } from '../../app/reducers/userSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './ProfileForm.module.css';
import NotificationMessage from '../../components/Messages/NotificationMessage/NotificationMessage';

const ProfileForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const [username, setUsername] = useState(user?.username || '');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const messageTimeout = 3000;

    useEffect(() => {
        setUsername(user?.username || '');
    }, [user]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setPasswordMismatchError('Passwords do not match');
                return;
            }
        }

        const updateData: any = {
            username
        };

        if (newPassword) {
            updateData.password = newPassword;
        }

        dispatch(updateUserProfile(updateData))
        .then((result) => {
            if (updateUserProfile.fulfilled.match(result)) {
                setSuccessMessage('Profile updated successfully!');
                setTimeout(() => setSuccessMessage(null), messageTimeout);
            } else if (updateUserProfile.rejected.match(result)) {
                setError(result.error.message || 'Something went wrong');
                setTimeout(() => setError(null), messageTimeout);
            }
        })
        .catch((error) => {
            console.log(error);
            setError(error.message || 'Something went wrong');
            setTimeout(() => setError(null), messageTimeout);
        });
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.info}>
            {error && 
                <NotificationMessage 
                    type="error"
                    key={Date.now()}
                    message={error} 
                    iconRight='close' 
                    iconRightClick={() => setError(null)} 
                    absolute={true}
                />
            }
            {successMessage && 
                <NotificationMessage 
                    type="success"
                    key={Date.now()}
                    message={successMessage} 
                    iconRight='close' 
                    iconRightClick={() => setSuccessMessage(null)} 
                    absolute={true} 
                />
            }
            <h2>Your Information</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    placeholder='Enter new password'
                    iconRight={showPassword ? "eyeOff" : "eyeOn"}
                    iconRightClick={handleShowPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    hasError={!!passwordMismatchError}
                    message={passwordMismatchError}
                />
                <Input
                    label="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    placeholder='Enter new password'
                    iconRight={showPassword ? "eyeOff" : "eyeOn"}
                    iconRightClick={handleShowPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    hasError={!!passwordMismatchError}
                    message={passwordMismatchError}
                />
                <Button type="submit" variant="secondary">Save</Button>
            </form>
        </div>
    );
};

export default ProfileForm;