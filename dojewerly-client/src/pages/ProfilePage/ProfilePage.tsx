import React from 'react';
import ProfileForm from '../../components/ProfileForm/ProfileForm';
import EmailSubscription from '../../components/EmailSubscription/EmailSubscription';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <ProfileForm />
            <EmailSubscription />
        </div>
    );
};

export default ProfilePage;