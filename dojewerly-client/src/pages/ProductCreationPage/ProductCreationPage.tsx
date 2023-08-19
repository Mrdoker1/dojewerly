import React from 'react';
import styles from './ProductCreationPage.module.css';
import AdminProductList from '../../components/AdminProductList/AdminProductList';

const ProductCreationPage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>ProductCreationPage</h1>
            <AdminProductList />
        </div>
    );
};

export default ProductCreationPage;