import React from 'react';
import Banner from './Banner';
import bannerOne from '../../assets/images/banner-3.jpeg';
import bannerTwo from '../../assets/images/banner-4.jpeg';

export interface CustomBannerProps {
  /** Тип баннера */
  type: 'left' | 'right';
}

const CustomBanner: React.FC<CustomBannerProps> = ({ type }) => {
  let banner;

  switch (type) {
    case 'left':
      banner = (
        <Banner
          type='left'
          backgroundImage={bannerOne}
          subHeader='LIMITED OFFER'
          title='Singing Birds'
          buttonText='CHECK'
          text='Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.'
          textColor='dark'
        />
      );
      break;
    case 'right':
      banner = (
        <Banner
          type='right'
          backgroundImage={bannerTwo}
          subHeader='LIMITED OFFER'
          title='Singing Birds'
          buttonText='CHECK'
          text='Dynamic and elusive abstraction and texture. Plays between the lines of chaos and serenity. Perfect fit for modern and contemporary styled interiors.'
          textColor='light'
        />
      );
      break;
  }

  return banner;
};

export default CustomBanner;
