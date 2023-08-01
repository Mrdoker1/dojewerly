import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContextMenu.module.css';

const ContextMenu: React.FC = () => {
  return (
    <div className={styles.userMenu}>
      <div className={styles.menuItem}>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className={styles.menuItem}>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

export default ContextMenu;