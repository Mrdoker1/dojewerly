import React from 'react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';
import LanguageDropdown from '../Dropdown/LanguageDropdown/LanguageDropdown';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.footer}>
      <div className={styles.footerLinksMain}>
        <ul>
          <li>{t('Our Care Guide')}</li>
          <li>{t('About US')}</li>
          <li>Do X Jewerly</li>
          <li><LanguageDropdown></LanguageDropdown></li>
        </ul>
      </div>
      <div className={styles.footerLinksAdditional}>
        <ul>
          <li>Facebook</li>
          <li className={styles.instagram}>Instagram</li>
          <li>Snapchat</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;