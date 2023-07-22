import React from 'react';

interface ButtonProps {
  onClick: () => void;
  text: string;
  children: React.ReactNode; // Add the children prop to the ButtonProps interface
}

const Button: React.FC<ButtonProps> = ({ onClick, text, children }) => {
  return (
    <button onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;