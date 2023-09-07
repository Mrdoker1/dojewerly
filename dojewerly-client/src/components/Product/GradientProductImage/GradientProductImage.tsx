import React from 'react';
import noImageIcon from '../../../assets/icons/no-image-S.svg';
import styles from './GradientProductImage.module.css'; // Подразумевается, что у вас есть такой CSS-модуль

interface GradientProductImageProps {
  imageUrl: string; 
  className?: string;
}

const GradientProductImage: React.FC<GradientProductImageProps> = ({ imageUrl, className }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const fullImageUrl = imageUrl ? `${apiUrl}/uploads/${imageUrl}` : noImageIcon;

  const style = {
    backgroundImage: `linear-gradient(to right, white 0%, transparent 50%), url(${fullImageUrl})`
  };

  return (
    <div className={`${styles.gradientImage} ${className}`} style={style}></div>
  );
};

export default GradientProductImage;