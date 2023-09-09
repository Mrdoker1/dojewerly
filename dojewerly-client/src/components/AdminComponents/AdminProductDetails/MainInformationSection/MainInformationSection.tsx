import React from 'react';
import Input from "../../../Input/Input";
import styles from './MainInformationSection.module.css';
import ProductImage from '../../../Image/ProductImage/ProductImage';
import { AppDispatch, RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductProperty, ProductUpdatableProperties, ProductPropsUpdatableProperties } from '../../../../app/reducers/productsSlice';
interface MainInformationProps {
}

const MainInformationSection: React.FC<MainInformationProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === selectedProductId));

  const handleInputChange = (property: ProductUpdatableProperties, value: any, subProperty?: ProductPropsUpdatableProperties) => {
    if (selectedProductId) {
      if (property === 'props' && subProperty) {
        const updatedProps = { ...selectedProduct?.props, [subProperty]: value };
        dispatch(updateProductProperty({ productId: selectedProductId, property, value: updatedProps }));
      } else {
        dispatch(updateProductProperty({ productId: selectedProductId, property, value }));
      }
    }
  };

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
        <div className={styles.namePriceContainer}>
          <Input 
            label="Name"
            placeholder="Product Name"
            value={selectedProduct?.name} 
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <Input 
            label="Price"
            placeholder="Price"
            type="number" 
            value={selectedProduct?.price.toString()} 
            onChange={(e) => handleInputChange('price', Number(e.target.value))}
          />
        </div>
        <Input 
          label="Info"
          placeholder="Info" 
          value={selectedProduct?.props.info} 
          onChange={(e) => handleInputChange('props', e.target.value, 'info')}
        />
      </div>
    </div>
    </>
  );
};

export default MainInformationSection;