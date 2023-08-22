import React from 'react';
import Input from "../../../Input/Input";
import styles from './MainInformationSection.module.css';
import ProductImage from '../../../Product/ProductImage/ProductImage';

interface MainInformationProps {
  name: string;
  price: number;
  description: string;
  image: string;
  setName: (value: string) => void;
  setPrice: (value: number) => void;
  setDescription: (value: string) => void;
}

const MainInformationSection: React.FC<MainInformationProps> = (props) => {
  return (
    <>
    <h2>Main Information</h2>
    <div className={styles.container}>
      <ProductImage 
        imageUrl={props.image} 
        alt={props.name} 
        className={styles.productImage} 
      />
      <div className={styles.infoContainer}>
        <div className={styles.namePriceContainer}> {/* Контейнер для полей Name и Price */}
          <Input 
            label="Name"
            placeholder="Product Name"
            value={props.name} 
            onChange={(e) => props.setName(e.target.value)} 
          />
          <Input 
            label="Price"
            placeholder="Price"
            type="number" 
            value={props.price.toString()} 
            onChange={(e) => props.setPrice(Number(e.target.value))} 
          />
        </div>
        <Input 
          label="Info"
          placeholder="Description" 
          value={props.description} 
          onChange={(e) => props.setDescription(e.target.value)} 
        />
      </div>
    </div>
    </>
  );
};

export default MainInformationSection;