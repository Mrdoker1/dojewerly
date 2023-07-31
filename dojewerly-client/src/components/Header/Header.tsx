import React from 'react';
import styles from './Header.module.css';
import icons from '../../assets/icons/icons';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
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
            <Link to="/signin">
              <li><icons.account/></li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;