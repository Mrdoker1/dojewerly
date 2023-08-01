import React from 'react';
import styles from './ErrorMessage.module.css'; // Импортируем стили из модуля

export interface ErrorMessageProps {
  /** Сообщение об ошибке, которое должно быть отображено */
  message?: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={styles.errorMessage}>
      {message}
    </div>
  );
};

export default ErrorMessage;