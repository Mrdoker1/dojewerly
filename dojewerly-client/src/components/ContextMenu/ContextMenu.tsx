import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ContextMenu.module.css';
import icons from '../../assets/icons/icons';

export interface MenuItem {
  /** Название пункта меню */
  label: string;
  /** Ссылка, на которую будет перенаправляться пользователь при клике на пункт меню (необязательное поле) */
  link?: string;
  /** Функция обратного вызова, которая будет выполняться при клике на пункт меню (необязательное поле) */
  onClick?: () => void;
  /** Ключ для выбора иконки слева от текста пункта меню (необязательное поле) */
  iconLeft?: keyof typeof icons;
  /** Ключ для выбора иконки справа от текста пункта меню (необязательное поле) */
  iconRight?: keyof typeof icons;
}

export interface ContextMenuProps {
  items: MenuItem[];
  className?: string; 
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items, className  }) => {
  return (
    <div className={`${styles.userMenu} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.menuItem}>
          {item.iconLeft && icons[item.iconLeft] && (
            <span className={styles.icon}>
              {React.createElement(icons[item.iconLeft])}
            </span>
          )}
          {item.link ? (
            <Link to={item.link} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <button type="button" onClick={item.onClick} className={styles.button}>
              {item.label}
            </button>
          )}
          {item.iconRight && icons[item.iconRight] && (
            <span className={styles.icon}>
              {React.createElement(icons[item.iconRight])}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;