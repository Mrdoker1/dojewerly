import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerLinksMain}>
        <ul>
          <li>Our Care Guide</li>
          <li>About US</li>
          <li>Do X Jewerly</li>
          <template>language-switcher</template>
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