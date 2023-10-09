import React from 'react';
import styles from './BurgerMenu.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import icons from '../../assets/icons/icons';
import LanguageDropdown from '../Dropdown/LanguageDropdown/LanguageDropdown';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants = {
  open: { x: 0 },
  closed: { x: "-100%" }
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();  // Закрыть меню после перехода
  };

  return (
      <motion.div
      className={`${styles.burgerMenu} ${isOpen ? styles.show : ''}`}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      >
        <div className={styles.menuHeader}>
          <div className={styles.burgerIcon} onClick={onClose}>
            <icons.close />
          </div>
          <icons.logo className={styles.logo} onClick={() => handleNavigation("/")}/>
          <icons.search className={styles.searchIcon} />
        </div>
        <div className={styles.menuItemsWrapper}>  {/* Эта новая обертка */}
        <ul>
          <li onClick={() => handleNavigation("/catalog?page=1&type=Barrette")}>{t('barrette')}</li>
          <li onClick={() => handleNavigation("/catalog?page=1&type=Ring")}>{t('rings')}</li>
          <li onClick={() => handleNavigation("/catalog?page=1&type=Brooch")}>{t('brooch')}</li>
          <li onClick={() => handleNavigation("/collections")}>{t('Collections')}</li>
          <li><LanguageDropdown></LanguageDropdown></li>
          <li><Button text="DO X" variant="primary" className={styles.doxButton}></Button></li>
          <li><Button text="ACCOUNT" variant="secondary" className={styles.doxButton}></Button></li>
          {/* Добавьте другие пункты меню, если нужно */}
        </ul>
      </div>
    </motion.div>
  );
};

export default BurgerMenu;
