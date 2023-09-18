import React, { memo } from 'react';
import HeroSection from './HeroSection/HeroSection';
import styles from './HomePage.module.css';
import FeaturedProductsSection from './FeaturedProductsSection/FeaturedProductsSection';
import FeaturedCollectionsSection from './FeaturedCollectionsSection/FeaturedCollectionsSection';
import InstaSection from './InstaSection/InstaSection';
import Banner from '../../components/Banner/Banner';
import bannerOne from '../../assets/images/banner-3.jpeg'
import bannerTwo from '../../assets/images/banner-4.jpeg'

const HomePage = memo(() => {
 
  return (
    <>
      <main className={styles.container}>
        <HeroSection></HeroSection>
        <FeaturedProductsSection></FeaturedProductsSection>
        <FeaturedCollectionsSection></FeaturedCollectionsSection>
        <Banner
          type={'left'}
          backgroundImage={bannerOne}
          subHeader={'LIMITED OFFER'}
          title={'Singing Birds'}
          buttonText={'CHECK'}
          text={'Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.'}
          textColor={'dark'}></Banner>
        <Banner
          type={'right'}
          backgroundImage={bannerTwo}
          subHeader={'LIMITED OFFER'}
          title={'Singing Birds'}
          buttonText={'CHECK'}
          text={'Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.'}
          textColor={'light'}></Banner>
        <InstaSection></InstaSection>
        {/* Здесь будут другие секции */}
      </main>
    </>
  );
});

export default HomePage;