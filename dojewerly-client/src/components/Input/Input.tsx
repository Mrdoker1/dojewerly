import React, { useEffect, useState, useMemo } from 'react';
import styles from './Input.module.css';
import icons from '../../assets/icons/icons';

export interface InputProps {
  /** Вызывается при клике на инпут */
  onClick?: () => void;
  /** Вызывается при изменении значения инпута */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Значение инпута */
  value?: string;
  /** Дефолтное значение инпута */
  defaultValue?: string;
  /** Подсказка, которая будет отображаться, когда в инпуте нет данных */
  placeholder?: string;
  /** Заголовок/лейбл инпута */
  label?: string;
  /** Тип инпута (например, text, password, и т. д.) */
  type?: string;
  /** Если `true`, инпут будет недоступен для ввода */
  disabled?: boolean;
  /** Дочерние элементы инпута */
  children?: React.ReactNode;
  /** Есть ли ошибка в инпуте */
  hasError?: boolean; 
  /** Сообщение, которое будет отображаться под инпутом */
  message?: string;
  /** Иконка, отображаемая справа от текста инпута */
  iconRight?: keyof typeof icons;
}

const Input: React.FC<InputProps> = ({ onChange, value, type, disabled, children, label, defaultValue, placeholder, hasError, message, iconRight  }) => {
    const [inputValue, setInputValue] = useState(value || defaultValue);
    const [isFocused, setIsFocused] = useState(false);
  
    useEffect(() => {
      setInputValue(value);
    }, [value]);
  
    const handleChange = useMemo(() => (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (onChange) {
        onChange(event);
      }
    }, [onChange]);
  
    const handleFocus = () => {
      setIsFocused(true);
    };
  
    const handleBlur = () => {
      setIsFocused(false);
    };

    const IconRight = iconRight ? icons[iconRight] : null;
  
    return (
      <div className={`${styles.container} ${hasError ? styles.error : ''}`}>
        <label>{label}</label>
        <div className={`${styles.inputStyle} ${isFocused ? styles.inputFocus : ''} ${hasError ? styles.inputError : ''}`}>
          <input
            onChange={handleChange}
            value={inputValue}
            type={type} 
            disabled={disabled}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {children}
          {IconRight && <IconRight className={styles.icon} />}
        </div>
        <div className={`${styles.message} ${hasError ? styles.errorText : ''}`}>{message}</div>
      </div>
    );
  };
  
  export default Input;