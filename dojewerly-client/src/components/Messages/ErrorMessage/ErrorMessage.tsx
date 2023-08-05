import React, { useEffect, useState } from 'react';
import styles from './ErrorMessage.module.css';
import icons from '../../../assets/icons/icons';

export interface ErrorMessageProps {
  /** Сообщение об ошибке, которое должно быть отображено */
  message?: string | null;
  /** Иконка, отображаемая справа от сообщения */
  iconRight?: keyof typeof icons;
  /** Вызывается при клике на иконку справа */
  iconRightClick?: () => void;
  /** Время в миллисекундах после которого сообщение автоматически исчезнет */
  timeout?: number;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, iconRight, iconRightClick, timeout }) => {
  const [isVisible, setIsVisible] = useState(true);
  const IconRight = iconRight ? icons[iconRight] : null;

  const handleIconRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (iconRightClick) {
      iconRightClick();
    }
  };

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div className={styles.errorMessage}>
      {message}
      {IconRight && <IconRight onClick={handleIconRightClick} className={styles.icon} />}
    </div>
  );
};

export default ErrorMessage;