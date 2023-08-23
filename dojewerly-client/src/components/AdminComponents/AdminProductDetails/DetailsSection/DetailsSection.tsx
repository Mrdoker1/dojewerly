import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from "../../../Dropdown/Dropdown";
import { fetchCatalogCriteria } from '../../../../app/reducers/catalogCriteriaSlice'; 
import { AppDispatch, RootState } from '../../../../app/store'; // Путь к вашему хранилищу Redux
import styles from './DetailsSection.module.css';
import Input from '../../../Input/Input';

interface DetailsProps {}

const DetailsSection: React.FC<DetailsProps> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const catalogCriteria = useSelector((state: RootState) => state.catalogCriteria.criteria);
    const selectedProduct = useSelector((state: RootState) => state.products.products.find(product => product._id === state.userDashboard.selectedProductId));

    useEffect(() => {
      if (!catalogCriteria) {
        dispatch(fetchCatalogCriteria());
      }
    }, [dispatch, catalogCriteria]);

    return (
      <>
        <h2>Details</h2>
        <div className={styles.container}>
          <div className={styles.inputContainer}>
            <Input 
              label="ID"
              placeholder="Product ID" 
              value={selectedProduct?.props.id.toString()}
            />
            <Input 
              label="Amount in Stock"
              type='number'
              placeholder="In stock" 
              value={selectedProduct?.stock.toString()}
            />
          </div>
          <div className={styles.inputContainer}>
            <Dropdown 
              label="Availability" 
              value={selectedProduct?.props.availability}
              options={catalogCriteria?.availability || []} 
            />
            <Dropdown 
              label="Material" 
              value={selectedProduct?.props.material}
              options={catalogCriteria?.materials || []} 
            />
          </div>
          <div className={styles.inputContainer}>
            <Dropdown 
              label="Gender" 
              value={selectedProduct?.props.gender}
              options={catalogCriteria?.genders || []} 
            />
            <Dropdown 
              label="Type" 
              value={selectedProduct?.props.type}
              options={catalogCriteria?.types || []} 
            />
          </div>
          <Input
            label="Description"
            placeholder="Description" 
            value={selectedProduct?.props.description.toString()}
          />
        </div>
      </>
    );
};

export default DetailsSection;