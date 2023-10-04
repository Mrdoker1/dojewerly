// hooks/useLocalizedInputHandler.ts
import { useState, useCallback } from 'react';
import { AppDispatch } from '../../../app/store';
import { useDispatch } from 'react-redux';
import { ProductPropsUpdatableProperties, ProductUpdatableProperties, updateProductProperty } from '../../../app/reducers/productsSlice';

export const defaultLanguageSet = {
  name: 'EN',
  price: 'EN',
  info: 'EN',
  stock: 'EN',
  description: 'EN'
}

const useLocalizedInputHandler = (selectedProductId: string, selectedProduct: any) => {
  const dispatch = useDispatch<AppDispatch>();

  type LocalizableProperties = 'name' | 'price' | 'info' | 'stock' | 'description';

  const [currentLanguage, setCurrentLanguage] = useState<Record<LocalizableProperties, string>>(defaultLanguageSet);

  const handleInputChange = useCallback((property: ProductUpdatableProperties, value: any, subProperty?: ProductPropsUpdatableProperties) => {
    if (selectedProductId) {
      if (property === 'props' && subProperty) {
        const updatedProps = { ...selectedProduct?.props, [subProperty]: value };
        dispatch(updateProductProperty({ productId: selectedProductId, property, value: updatedProps }));
      } else {
        dispatch(updateProductProperty({ productId: selectedProductId, property, value }));
      }
    }
  }, [selectedProductId, selectedProduct, dispatch]);

  const handleLocalizedInputChange = useCallback((property: ProductUpdatableProperties, value: any, language: string) => {
    if (selectedProductId && selectedProduct) {
      // Если у продукта нет поля localization, создаем его
      let updatedProduct = { ...selectedProduct };
      if (!updatedProduct.localization) {
          updatedProduct.localization = {};
      }      

      const updatedLocalization = {
        ...selectedProduct.localization,
        [language]: {
          // Если нет локализации для данного языка, создаем ее
          ...selectedProduct?.localization?.[language] || { },
          [property]: value
        }
      };
      dispatch(updateProductProperty({ productId: selectedProductId, property: 'localization', value: updatedLocalization }));
    }
}, [selectedProductId, selectedProduct, dispatch]);

  const inputDataChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>, lang: string, type: LocalizableProperties) => {
    const inputValue = type === 'price' ? Number(e.target.value) : e.target.value;
    console.log(inputValue)
    lang === 'EN' ? handleInputChange(type, inputValue) : handleLocalizedInputChange(type, inputValue, currentLanguage[type]);
}, [handleInputChange, handleLocalizedInputChange, currentLanguage]);

  const inputLanguageChangeHandler = (lang: string, type: ProductUpdatableProperties) => {
    setCurrentLanguage(prevState => ({ ...prevState, [type]: lang }));
  };

  return {
    currentLanguage,
    inputDataChangeHandler,
    inputLanguageChangeHandler,
    setCurrentLanguage,
    handleInputChange
  };
};

export default useLocalizedInputHandler;
