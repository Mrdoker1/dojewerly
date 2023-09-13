// import React from 'react';
// import noImageIcon from '../../../assets/icons/no-image-S.svg';

// interface ProductImageProps {
//   imageUrl: string; // Теперь это просто имя файла изображения
//   alt: string;
//   className?: string;
// }

// const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt, className }) => {
//   const apiUrl = process.env.REACT_APP_API_URL; // Получаем базовый URL
//   const fullImageUrl = imageUrl ? `${apiUrl}/uploads/${imageUrl}` : noImageIcon;

//   const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
//     const target = e.target as HTMLImageElement;
//     target.onerror = null;
//     target.src = noImageIcon;
//   };

//   return (
//     <img
//       src={fullImageUrl}
//       alt={alt}
//       className={className}
//       onError={handleImageError}
//     />
//   );
// };

// export default ProductImage;

import React from 'react';
import icons from '../../../assets/icons/icons';

interface ProductImageProps {
  imageUrl: string;
  alt: string;
  className?: string;
  defaultImage?: keyof typeof icons;
}

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, alt, className, defaultImage }) => {
  const apiUrl = process.env.REACT_APP_API_URL || ''; // Получаем базовый URL
  const fullImageUrl = `${apiUrl}/uploads/${imageUrl}`;
  const Icon = defaultImage ? icons[defaultImage] : icons['noImageS'];

  return imageUrl === undefined || imageUrl === '' ? (
    <div className={className} >
      <Icon className={className} />
    </div>
  ) : (
    <img
        src={fullImageUrl}
        alt={alt}
        className={className}
    />
  );
};

export default ProductImage;