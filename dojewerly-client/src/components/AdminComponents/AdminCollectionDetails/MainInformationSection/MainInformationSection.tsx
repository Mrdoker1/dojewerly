import React from 'react';
import Input from "../../../Input/Input";
import styles from './MainInformationSection.module.css';
import { AppDispatch, RootState } from '../../../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { CollectionUpdatableProperties, updateCollectionProperty } from '../../../../app/reducers/collectionsSlice';
import TextArea from '../../../TextArea/TextArea';

const MainInformationSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCollectionId = useSelector((state: RootState) => state.userDashboard.selectedCollectionId);
  const selectedCollection = useSelector((state: RootState) => 
    state.collections.collections.find(collection => collection._id === selectedCollectionId)
  );

  const handleInputChange = (property: CollectionUpdatableProperties, value: any) => {
    if (!selectedCollectionId) return; // Добавляем проверку

    dispatch(updateCollectionProperty({
      collectionId: selectedCollectionId,
      property,
      value
    }));
  };

  return (
    <>
    <h2>Information about Collection</h2>
    <div className={styles.container}>
    {/* <CollectionImage collectionId={selectedCollectionId || ''} className={styles.collectionImage}/> */}
      <div className={styles.infoContainer}>
        <Input 
          label="Name"
          placeholder="Collection Name"
          value={selectedCollection?.name} 
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <TextArea 
          label="Description"
          placeholder="Description"
          value={selectedCollection?.description} 
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>
    </div>
    </>
  );
};

export default MainInformationSection;