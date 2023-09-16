import React, { memo } from 'react';
import HeroSection from './HeroSection/HeroSection';
import styles from './HomePage.module.css';
import FeaturedProductsSection from './FeaturedProductsSection/FeaturedProductsSection';
import FeaturedCollectionsSection from './FeaturedCollectionsSection/FeaturedCollectionsSection';
import InstaSection from './InstaSection/InstaSection';

const HomePage = memo(() => {
 
  return (
    <>
      <main className={styles.container}>
        <HeroSection></HeroSection>
        <FeaturedProductsSection></FeaturedProductsSection>
        <FeaturedCollectionsSection></FeaturedCollectionsSection>
        <InstaSection></InstaSection>
        {/* Здесь будут другие секции */}
      </main>
    </>
  );
});

export default HomePage;