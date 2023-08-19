import React, { useState } from 'react';
import styles from './Header.module.css';
import variables from '../../variables.module.css'
import icons from '../../assets/icons/icons';
import { Link, useNavigate } from 'react-router-dom'; // Заменим useHistory на useNavigate
import ContextMenu, { MenuItem } from '../ContextMenu/ContextMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logoutUser } from '../../app/reducers/authSlice';
import { AppDispatch } from '../../app/store';

const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleAccountClick = () => {
    console.log('Token:', auth.token);
    if (auth.token) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      navigate('/signin');
    }
  };

  const handleLogout = () => { 
    dispatch(logoutUser()).then(() => {
        navigate('/signin');
    });
};
    // Создаем массив с пунктами меню
    const menuItems: MenuItem[] = [
      {
        label: 'Dashboard',
        link: '/dashboard/profile', // Перенаправление на /dashboard при клике
      },
      {
        label: 'Logout',
        onClick: handleLogout, // Перенаправление на /logout при клике
      }
    ];

  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <template>burger-component</template>
        <Link to="/">
          <icons.logo className={styles.logo} />
        </Link>
        <nav className={styles.menuNavigation}>
          <ul>
            <li>barrette</li>
            <li>rings</li>
            <li>brooch</li>
            <li>collections</li>
            <li><template>language-switcher</template></li>
            <li><icons.dox/></li>
            <li><icons.search/></li>
            <li onClick={handleAccountClick}>
              <icons.account />
              {isMenuOpen && <ContextMenu items={menuItems} className={variables.absolute}/>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;