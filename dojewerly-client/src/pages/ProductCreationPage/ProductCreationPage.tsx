import React from 'react';
import styles from './ProductCreationPage.module.css';
import AdminProductList from '../../components/AdminComponents/AdminProductList/AdminProductList';
import AdminProductDetails from '../../components/AdminComponents/AdminProductDetails/AdminProductDetails';

const ProductCreationPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <AdminProductDetails />
                <AdminProductList />
            </div>
        </div>
    );
};

export default ProductCreationPage;