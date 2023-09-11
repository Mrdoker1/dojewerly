import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import variables from '../../variables.module.css'
import icons from '../../assets/icons/icons';
import { Link, useNavigate } from 'react-router-dom'; // Заменим useHistory на useNavigate
import ContextMenu, { MenuItem } from '../ContextMenu/ContextMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logoutUser } from '../../app/reducers/authSlice';
import { AppDispatch } from '../../app/store';
import TopMessage from '../Messages/TopMessage/TopMessage';

const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      { isDivider: true },
      {
        label: 'Logout',
        onClick: handleLogout, // Перенаправление на /logout при клике
      }
    ];

  return (
    <div className={styles.header}>
      <TopMessage message='Working in progress' visible={true} iconRight='close'/>
      <div className={`${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`}>
        <Link to="/">
          <icons.logo className={styles.logo} />
        </Link>
        <nav className={styles.menuNavigation}>
          <ul>
            <Link to="/catalog?type=Barrette">
              <li>barrette</li>
            </Link>
            <Link to="/catalog?type=Ring">
              <li>rings</li>
            </Link>
            <Link to="/catalog?type=Brooch">
              <li>brooch</li>
            </Link>
            <li>collections</li>
            <li><template>language-switcher</template></li>
            <li className={styles.doxIcon}><icons.dox/></li>
            <li><icons.search/></li>
            <li onClick={handleAccountClick}>
              <icons.account />
              {isMenuOpen && <ContextMenu items={menuItems} className={variables.absolute} onClose={() => setIsMenuOpen(false)}/>}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;