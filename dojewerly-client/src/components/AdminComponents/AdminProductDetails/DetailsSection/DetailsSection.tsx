import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from "../../../Dropdown/Dropdown";
import { fetchCatalogCriteria } from '../../../../app/reducers/catalogCriteriaSlice'; 
import { AppDispatch, RootState } from '../../../../app/store'; // Путь к вашему хранилищу Redux
import styles from './DetailsSection.module.css';
import Input from '../../../Input/Input';
import { ProductPropsUpdatableProperties, ProductUpdatableProperties, updateProductProperty } from '../../../../app/reducers/productsSlice';
import TextArea from '../../../TextArea/TextArea';

interface DetailsProps {}

const DetailsSection: React.FC<DetailsProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const catalogCriteria = useSelector((state: RootState) => state.catalogCriteria.criteria);
    const selectedProductId = useSelector((state: RootState) => state.userDashboard.selectedProductId);
    const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === state.userDashboard.selectedProductId));

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

  function createDropdownOptions(values: string[] | undefined) {
    if (!values) {
      return []
    } 
    return values.map(value => ({
      label: value,
      value: value,
    }));
  }

    useEffect(() => {
      if (!catalogCriteria) {
        dispatch(fetchCatalogCriteria());
      }
    }, [dispatch, catalogCriteria]);

    console.log(selectedProduct?.props.availability);

    return (
      <>
        <h2>Details</h2>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <Input 
              label="ID"
              placeholder="Product ID" 
              value={selectedProduct?.props.id.toString()}
              onChange={(e) => handleInputChange('props', Number(e.target.value), 'id')}
            />
            <Input 
              label="Amount in Stock"
              type='number'
              placeholder="In stock" 
              value={selectedProduct?.stock.toString()}
              onChange={(e) => handleInputChange('stock', Number(e.target.value))}
            />
          </div>
          <div className={styles.inputContainer}>
            <Dropdown 
              label="Availability" 
              value={selectedProduct?.props.availability}
              //options={catalogCriteria?.availability || []}
              options={createDropdownOptions(catalogCriteria?.availability) || []}
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'availability')}
            />
            <Dropdown 
              label="Material" 
              value={selectedProduct?.props.material}
              options={createDropdownOptions(catalogCriteria?.materials) || []} 
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'material')}
            />
          </div>
          <div className={styles.inputContainer}>
            <Dropdown 
              label="Gender" 
              value={selectedProduct?.props.gender}
              //options={catalogCriteria?.genders || []}
              options={createDropdownOptions(catalogCriteria?.genders) || []}
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'gender')}
            />
            <Dropdown 
              label="Type" 
              value={selectedProduct?.props.type}
              //options={catalogCriteria?.types || []} 
              options={createDropdownOptions(catalogCriteria?.types) || []}     
              placeholder='Select an option...'
              onChange={(value) => handleInputChange('props', value, 'type')}
            />
          </div>
          <TextArea
            label="Description"
            placeholder="Description" 
            value={selectedProduct?.props.description}
            onChange={(e) => handleInputChange('props', e.target.value, 'description')}
          />
        </div>
      </>
    );
};

export default DetailsSection;