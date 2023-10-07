import React from 'react';
import Input from '../Input';
import styles from './SearchInput.module.css'
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
    value: string;
    hasError?: boolean;
    message?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    iconRightClick?: () => void;
  }
  
  const SearchInput: React.ForwardRefRenderFunction<HTMLInputElement, SearchInputProps> = ({
    value,
    hasError,
    message,
    onChange,
    iconRightClick
    }, ref) => {
  
    const iconRight = 'search';
    const { t } = useTranslation();
  
    return (
      <Input
        ref={ref}
        type={'text'}
        value={value}
        placeholder={`${t('Search')}...`}
        hasError={hasError}
        message={message}
        iconRight={iconRight}
        iconRightClick={iconRightClick}
        onChange={onChange}
        className={styles.searchInput}
        fullWidth={false}
      />
    );
  };
  
  export default React.forwardRef(SearchInput);