import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCollection, removeProductFromCollection } from '../../../../app/reducers/collectionsSlice';
import { AppDispatch, RootState } from '../../../../app/store';
import styles from './AdminProductListItem.module.css';
import AdminProductListItemInfo from './AdminProductListItemInfo/AdminProductListItemInfo';
import Button from '../../../Button/Button';

interface AdminCollectionProductListItemProps {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

const AdminCollectionProductListItem: React.FC<AdminCollectionProductListItemProps> = ({
    id,
    name,
    description,
    price,
    imageUrl,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
    const selectedCollection = useSelector((state: RootState) => state.collections.collections.find(coll => coll._id === selectedCollectionId));
    

    const handleAddProduct = () => {
        if (selectedCollection?._id)
        dispatch(addProductToCollection({ collectionId: selectedCollection._id, productId: id }));
    };

    const handleRemoveProduct = () => {
        if (selectedCollection?._id)
        dispatch(removeProductFromCollection({ collectionId: selectedCollection._id, productId: id }));
    };

    const isProductInCollection = selectedCollection?.productIds.includes(id);

    return (
        <div className={styles.container}>
            <AdminProductListItemInfo imageUrl={imageUrl} name={name} description={description} price={price}/>
            {isProductInCollection ? (
                <div className={styles.buttonContainer}>
                    <Button 
                        text="ADDED"
                        size="small"
                        variant="primary"
                        disabled={true}
                        iconLeft="checkmark"
                    />
                    <Button 
                        text="REMOVE"
                        size="small"
                        onClick={handleRemoveProduct}
                        variant="secondary" 
                    />
                </div>
            ) : (
                <Button 
                    text="ADD TO COLLECTION" 
                    size="small"
                    onClick={handleAddProduct}
                    variant="secondary"
                    iconLeft="plus"
                />
            )}
        </div>
    );
};

export default AdminCollectionProductListItem;