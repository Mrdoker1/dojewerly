import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import styles from './AdminProductDetails.module.css';
import MainInformationSection from './MainInformationSection/MainInformationSection';
import GallerySection from './GallerySection/GallerySection';
import DetailsSection from './DetailsSection/DetailsSection';
import Button from '../../Button/Button';

const AdminProductDetails = () => {
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const selectedProduct = useSelector((state: RootState) =>
    state.products.products.find(product => product._id === selectedProductId)
  );

  const handleSave = () => {
    // Обработка сохранения продукта
  };

  if (!selectedProduct) {
    return <div className={styles.container}>No product selected.</div>;
  }

  return (
    <form className={styles.container}>
      <MainInformationSection/>
      <GallerySection/>
      <DetailsSection />
      <Button 
        text="SAVE" 
        type="submit"
        size="small"
        onClick={handleSave} 
        variant="secondary"
        fullWidth={false}
      />
    </form>
  );
};

export default AdminProductDetails;