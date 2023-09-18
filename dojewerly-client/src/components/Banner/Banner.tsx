import React from 'react';
import styles from './Banner.module.css';
import Button from '../Button/Button';
import ProductImage from '../Image/ProductImage/ProductImage';

interface BannerProps {
  /** Выбор текста слева или справа */
  type: 'left' | 'right';
  /** Изображение для бэкграунда */
  backgroundImage: string;
  /** Цвет текста */
  textColor: 'light' | 'dark';
  /** Сабхэдер баннера */
  subHeader?: string;
  /** Текст баннера */
  text?: string;
  /** Заголовок баннера */
  title?: string;
  /** Текст кнопки */
  buttonText?: string;
  /** Обработчик клика по баннеру или кнопке */
  onClick?: () => void;
}

const Banner: React.FC<BannerProps> = ({ type, backgroundImage, textColor, subHeader, text, title, buttonText, onClick }) => {

  const button = textColor === 'light' ? <Button className={styles.whiteButton} customColor='white' variant='secondary'>{buttonText}</Button> : <Button variant='secondary'>{buttonText}</Button>

  const bannerStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div className={styles.container} >
        <div className={`${styles.bannerWrapper} ${type === 'right' ? styles.bannerLeft: styles.bannerRight}`} onClick={onClick}>
            <div className={`${type === 'right' ? styles.bannerTextRight : styles.bannerTextLeft} ${type === 'right' ? styles.light : styles.dark}`}>
                {subHeader && <h3 className={styles.bannerSubheading}>{subHeader}</h3>}
                {title && <h2 className={styles.bannerHeading}>{title}</h2>}
                {text && <span className={styles.bannerDescription}>{text}</span>}
                {buttonText && button}
            </div>
            <div style={bannerStyles} className={textColor === 'light' ? styles.bannerImageLight : styles.bannerImageDark}></div>
        </div>
    </div>
  );
};

export default Banner;
