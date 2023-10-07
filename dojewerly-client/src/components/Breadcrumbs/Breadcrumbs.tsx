import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.css';
import { useTranslation } from 'react-i18next';

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.link}>{t('Home')}</Link>
      {pathnames.map((value, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        
        // Получаем локализованное значение или используем значение по умолчанию

        console.log('translatedValue', value);
        const translatedValue = t(value) !== value ? t(value) : capitalizeFirstLetter(value);

        return (
          <span key={to}>
            {' / '}
            <Link to={to} className={isLast ? `${styles.link} ${styles.lastLink}` : styles.link}>
              {translatedValue}
            </Link>
          </span>
        );
      })}
    </div>
  );
}


export default Breadcrumbs;
