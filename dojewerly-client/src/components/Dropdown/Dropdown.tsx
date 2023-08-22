import React, { useState } from 'react';
import styles from './Dropdown.module.css';
import icons from '../../assets/icons/icons';

export interface DropdownProps {
    /** Массив опций для дропдауна */
    options: { value: string, label: string }[];
    /** Вызывается при изменении значения дропдауна */
    onChange?: (value: string) => void;
    /** Значение дропдауна */
    value?: string;
    /** Дефолтное значение дропдауна */
    placeholder?: string;
    /** Заголовок/лейбл дропдауна */
    label?: string;
    /** Есть ли ошибка в дропдауне */
    hasError?: boolean;
    /** Сообщение, которое будет отображаться под дропдауном */
    message?: string;
    /** Иконка, отображаемая справа от дропдауна */
    iconRight?: keyof typeof icons;
    /** Если `true`, дропдаун будет недоступен для ввода */
    disabled?: boolean;
  }

  const Dropdown: React.FC<DropdownProps> = ({ options, onChange, label, hasError, message, iconRight, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<{ value?: string, label?: string }>({});
  
    // Выбор иконки в зависимости от состояния дропдауна
    const IconRight = isOpen ? icons['arrowUp'] : (iconRight ? icons[iconRight] : icons['arrowDown']);
  
    const handleDropdownChange = (value: { value: string, label: string }) => {
      setSelectedValue(value);
      setIsOpen(false);
      if (onChange) {
        onChange(value.value);
      }
    };
  
    return (
      <div className={styles.container}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={`${styles.dropdown} ${hasError ? styles.error : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span>{selectedValue.label || placeholder}</span>
          {IconRight && <IconRight className={styles.iconRight} />}
        </div>
        {isOpen && (
          <div className={styles.options}>
            {options.map((option) => (
              <div key={option.value} className={styles.option} onClick={() => handleDropdownChange(option)}>{option.label}</div>
            ))}
          </div>
        )}
        <div className={`${styles.message} ${hasError ? styles.errorText : ''}`}>{message}</div>
      </div>
    );
  };

export default Dropdown;