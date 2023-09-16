import React, { memo } from 'react';
import Button from '../../../components/Button/Button';
import styles from './HeroSection.module.css';
import heroVideoSrc from '../../../assets/videos/hero.mp4';
import { useNavigate } from 'react-router-dom';

const HeroSection = memo(() => {

  const navigate = useNavigate();

  return (
    <div className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>
          Custom jewelry for friends, family, and special occasions.
        </h1>
        <div className={styles.heroButtons}>
          <Button 
            text="SEARCH CATALOG" 
            size="large" 
            variant="primary" 
            fullWidth 
            className={styles.heroSearchCatalog}
            onClick={() => {navigate("/catalog");}}
          />
          <Button 
            text="READ OUR CARE GUIDE" 
            size="large" 
            variant="text"
            className={styles.heroCareGuide}
            iconRight='arrowRight'
            onClick={() => {/* TODO: Add functionality here */}}
          />
        </div>
      </div>
      <div className={styles.videoWrapper}>
        <video 
          className={styles.heroVideo} 
          preload="true" 
          playsInline 
          autoPlay 
          loop 
          muted 
          src={heroVideoSrc}>
        </video>
      </div>
    </div>
  );
});

export default HeroSection;
