import React, { useState } from 'react';
import styles from './Header.module.css';
import icons from '../../assets/icons/icons';
import { Link, useNavigate } from 'react-router-dom'; // Заменим useHistory на useNavigate
import UserMenu from '../ContextMenu/ContextMenuu';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const Header: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    console.log(auth.token);
    if (auth.token) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      navigate('/signin');
    }
  };

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
              {isMenuOpen && <UserMenu />}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;