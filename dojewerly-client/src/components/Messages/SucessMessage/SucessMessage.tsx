import React, { useEffect, useState } from 'react';
import styles from './SucessMessage.module.css';
import icons from '../../../assets/icons/icons';

export interface SuccessMessageProps {
  /** Сообщение об успехе, которое должно быть отображено */
  message?: string | null;
  /** Иконка, отображаемая справа от текста сообщения */
  iconRight?: keyof typeof icons;
  /** Вызывается при клике на иконку справа */
  iconRightClick?: () => void;
  /** Время в миллисекундах, после которого сообщение исчезнет */
  timeout?: number;
  /** Показывать поверх */
  absolute?: boolean;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, iconRight, iconRightClick, timeout, absolute }) => {
  const [isVisible, setIsVisible] = useState(true);
  const IconRight = iconRight ? icons[iconRight] : null;

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(false);  // Скрываем сообщение при нажатии на крестик
  };

  const containerStyle = absolute ? styles.absoluteContainer : '';

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
    <div className={`${styles.successMessage} ${containerStyle}`}>
      {message}
      {IconRight && <IconRight onClick={handleClose} className={styles.icon} />}
    </div>
  );
};

export default SuccessMessage;