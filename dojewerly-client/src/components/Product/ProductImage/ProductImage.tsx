import React from 'react';
import noImageIcon from '../../../assets/icons/no-image-S.svg';

interface ProductImageProps {
  imageUrl: string; // Теперь это просто имя файла изображения
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt, className }) => {
  const apiUrl = process.env.REACT_APP_API_URL; // Получаем базовый URL
  const fullImageUrl = `${apiUrl}/uploads/${imageUrl}`; // Формируем полный URL

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = noImageIcon;
  };

  return (
    <img
      src={fullImageUrl || noImageIcon}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
};

export default ProductImage;