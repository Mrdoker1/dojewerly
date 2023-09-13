import React from 'react';
import Dropdown, { DropdownOption } from '../Dropdown';
import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
    /** Массив опций для дропдауна */
    options: DropdownOption[];
    /** Вызывается при изменении значения дропдауна */
    onChange?: (value: string) => void;
    /** Значение дропдауна */
    value?: string | number;
    /** Плейсхолдер если нет значения */
    placeholder?: string;
    /** Если `true`, дропдаун будет недоступен для ввода */
    disabled?: boolean;
  }
  
  const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    onChange,
    placeholder,
    value
}) => {
    const isDefaultValue = options.findIndex(opt => opt.value === value) === 0;
    const dropdownClassName = isDefaultValue ? styles.filerDropdown : `${styles.filerDropdown} ${styles.active}`;

    return (
        <div className={styles.container}>
            <Dropdown
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                value={value}
                className={dropdownClassName}
            />
        </div>
    );
};
  
  export default FilterDropdown;