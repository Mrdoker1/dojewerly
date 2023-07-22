import React from 'react';

export interface ButtonProps {
  /** Вызывается при клике на кнопку */
  onClick?: () => void;
  /** Текст кнопки */
  text?: string;
  /** Размер кнопки */
  size?: 'default' | 'large'; // новое свойство
  /** Если `true`, кнопка будет недоступна */
  disabled?: boolean;
  /** Дочерние элементы кнопки */
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, size, disabled, children }) => {
  const buttonStyle = size === 'large' ? { fontSize: '2em' } : { fontSize: '1em' };

  return (
    <button onClick={onClick} disabled={disabled} style={buttonStyle}>
      {text}
      {children}
    </button>
  );
};

export default Button;