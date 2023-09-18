import React from 'react';
import icons from '../../assets/icons/icons';
import styles from './Button.module.css'; // Импортируем стили из модуля

export interface ButtonProps {
  /** Вызывается при клике на кнопку */
  onClick?: () => void;
  /** Текст кнопки */
  text?: string;
  /** Размер кнопки */
  size?: 'small' | 'default' | 'large';
  /** Если `true`, кнопка будет недоступна */
  disabled?: boolean;
  /** Тип кнопки */
  type?: 'button' | 'submit' | 'reset';
  /** Дочерние элементы кнопки */
  children?: React.ReactNode;
  /** Вариант кнопки */
  variant?: 'primary' | 'secondary' | 'text';
  /** На всю ширину */
  fullWidth?: boolean;
  /** Кастомный цвет, может быть HEX кодом или переменной типа --color*/
  customColor?: string,
  /** Иконка, отображаемая слева от текста кнопки */
  iconLeft?: keyof typeof icons;
  /** Иконка, отображаемая справа от текста кнопки */
  iconRight?: keyof typeof icons;
  /** Дополнительные классы стилей для кнопки */
  className?: string;
}

const Button: React.FC<ButtonProps> = ({type= 'button', text, size = 'default', onClick, disabled, fullWidth, customColor, iconLeft, iconRight, children, variant= 'primary', className }) => {
  const IconLeft = iconLeft ? icons[iconLeft] : null;
  const IconRight = iconRight ? icons[iconRight] : null;

  const buttonStyles = (customColor && variant === 'primary')
  ? { 
      backgroundColor: customColor.startsWith('--') 
      ? `var(${customColor})` 
      : customColor,
      color: '#fff' 
    }
  : {
      color: customColor
  };

  
const iconStyles = (customColor && variant === 'primary')
  ? { fill: '#fff' }
  : {};

  const buttonClass = customColor 
  ? `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${styles.noHover} ${className}`
  : `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={buttonStyles}
      className={buttonClass}>
        {IconLeft && <IconLeft style={iconStyles} className={styles.icon} />}
        {text}
        {IconRight && <IconRight style={iconStyles} className={styles.icon} />}
        {children}
    </button>
  );
};

export default Button;