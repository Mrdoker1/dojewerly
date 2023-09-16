import React, { memo, useEffect, useState } from 'react';
import icons from '../../../assets/icons/icons'; // Если путь к иконкам другой, пожалуйста, замените его
import styles from './InstaSection.module.css';
import Button from '../../../components/Button/Button';
import image1 from '../../../assets/images/instagram/1.jpg';
import image2 from '../../../assets/images/instagram/2.jpg';
import image3 from '../../../assets/images/instagram/3.jpg';
import image4 from '../../../assets/images/instagram/4.jpg';
import image5 from '../../../assets/images/instagram/5.jpg';
import image6 from '../../../assets/images/instagram/6.jpg';
import image7 from '../../../assets/images/instagram/7.jpg';
import image8 from '../../../assets/images/instagram/8.jpg';

const InstaSection = memo(() => {

  useEffect(() => {
    setImages([image1, image2, image3, image4, image5, image6, image7, image8]);
  }, []);

  const [images, setImages] = useState<string[]>([]);
  const InstagramIcon = icons.instagram; // Замените 'instagram' на имя вашей иконки, если оно другое

  const generateImagePaths = (basePath: string, start: number, end: number): string[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => `${basePath}${i + start}.jpg`);
}

  useEffect(() => {
    // Тут вы бы делали вызов к Instagram API для получения изображений
    // Например:
    // fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token=YOUR_ACCESS_TOKEN')
    //   .then(response => response.json())
    //   .then(data => {
    //     const imageUrls = data.data.map((item: any) => item.images.standard_resolution.url);
    //     setImages(imageUrls);
    //   });

    // В качестве временного решения, пока у вас нет доступа к API, я просто добавлю некоторые плейсхолдеры
    //setImages(generateImagePaths('./assets/images/instagram/', 1, 8)); // и так далее
  }, []);

  return (
    <div className={styles.instagramWrapper}>
      <div className={styles.instagramGallery}>
        {images.slice(0, 4).map(src => (
          <div className={styles.instagramImageWrapper} key={src}>
            <img src={src} alt="Instagram post" />
            <InstagramIcon className={styles.instagramIcon} />
          </div>
        ))}
      </div>
      <div className={styles.instagramCta}>
        <h2 className={styles.subsection}>Join #do.jewelry</h2>
        <Button 
            text="FOLLOW US ON INSTAGRAM" 
            size="large" 
            variant="secondary" 
            iconRight='insta'
            onClick={() => {/* TODO: Add functionality here */}}
            className={styles.ctaButton}
          />
      </div>
      <div className={styles.instagramGallery}>
        {images.slice(4).map(src => (
          <div className={styles.instagramImageWrapper} key={src}>
            <img src={src} alt="Instagram post" />
            <InstagramIcon className={styles.instagramIcon} />
          </div>
        ))}
      </div>
    </div>
  );
});

export default InstaSection;
