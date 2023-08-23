import React from 'react';
import Input from "../../../Input/Input";
import styles from './MainInformationSection.module.css';
import ProductImage from '../../../Product/ProductImage/ProductImage';
import { AppDispatch, RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux';

interface MainInformationProps {
}

const MainInformationSection: React.FC<MainInformationProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === selectedProductId));


  return (
    <>
    <h2>Main Information</h2>
    <div className={styles.container}>
      <ProductImage 
        imageUrl={selectedProduct?.imageURLs[0] || ''} 
        alt={selectedProduct?.name || 'Product image'} 
        className={styles.productImage} 
      />
      <div className={styles.infoContainer}>
        <div className={styles.namePriceContainer}> {/* Контейнер для полей Name и Price */}
          <Input 
            label="Name"
            placeholder="Product Name"
            value={selectedProduct?.name} 
          />
          <Input 
            label="Price"
            placeholder="Price"
            type="number" 
            value={selectedProduct?.price.toString()} 
          />
        </div>
        <Input 
          label="Info"
          placeholder="Description" 
          value={selectedProduct?.props.description} 
        />
      </div>
    </div>
    </>
  );
};

export default MainInformationSection;