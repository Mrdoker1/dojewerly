import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store';
import styles from './AdminProductDetails.module.css';
import MainInformationSection from './MainInformationSection/MainInformationSection';
import GallerySection from './GallerySection/GallerySection';
import DetailsSection from './DetailsSection/DetailsSection';
import Button from '../../Button/Button';
import { partialUpdateProduct } from '../../../app/reducers/productsSlice';
import { addNotification } from '../../../app/reducers/notificationSlice';

const AdminProductDetails = () => {
  const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
  const selectedProduct = useSelector((state: RootState) =>
    state.products.products.find(product => product._id === selectedProductId)
  );
  
  // Извлекаем порядок изображений
  const imagesOrder = useSelector((state: RootState) => state.userDashboard.imagesOrder);

  const dispatch: AppDispatch = useDispatch();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProduct) {
      let updatedProduct = { ...selectedProduct };
  
      // Если есть порядок изображений, обновляем imageURLs продукта
      if (imagesOrder.length) {
        updatedProduct = { ...updatedProduct, imageURLs: imagesOrder };
      }
  
      if (updatedProduct._id) {
        dispatch(partialUpdateProduct({ id: updatedProduct._id, updates: updatedProduct }))
          .unwrap()
          .then(() => {
            console.log('Product updated successfully');
            // Уведомление об успешном обновлении
            dispatch(addNotification({
              id: Date.now(),
              type: 'success',
              message: 'Product updated successfully!',
              iconRight: 'close',
              timeout: 3000,
            }));
          })
          .catch(error => {
            console.error('Failed to update product:', error);
            // Уведомление о неудачном обновлении
            dispatch(addNotification({
              id: Date.now(),
              type: 'error',
              message: 'Failed to update product!',
              iconRight: 'close',
              timeout: 3000,
            }));
          });
      } else {
        console.error('Product _id is undefined');
        // Уведомление о неудачном обновлении
        dispatch(addNotification({
          id: Date.now(),
          type: 'error',
          message: 'Product ID is undefined!',
          iconRight: 'close',
          timeout: 3000,
        }));
      }
    }
  };

  if (!selectedProduct) {
    return <div className={styles.container}>No product selected.</div>;
  }

  return (
    <form onSubmit={handleSave} className={styles.container}>
      <MainInformationSection/>
      <GallerySection/>
      <DetailsSection />
      <Button 
        text="SAVE" 
        type="submit"
        size="small"
        variant="secondary"
        fullWidth={false}
      />
    </form>
  );
};

export default AdminProductDetails;