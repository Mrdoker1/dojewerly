import React, { useEffect, useState } from 'react';
import styles from './NotificationMessage.module.css';
import icons from '../../../assets/icons/icons';
import { MessageType } from '../messageTypes';

export interface NotificationMessageProps {
  /** Тип сообщения: успех или ошибка */
  type?: MessageType;
  /** Сообщение, которое должно быть отображено */
  message?: string | null;
  /** Иконка, отображаемая справа от сообщения */
  iconRight?: keyof typeof icons;
  /** Вызывается при клике на иконку справа */
  iconRightClick?: () => void;
  /** Время в миллисекундах, после которого сообщение исчезнет */
  timeout?: number;
  /** Показывать поверх */
  absolute?: boolean;
  /** Показывать сообщение */
  visible?: boolean
}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  type, message, iconRight, iconRightClick, timeout, absolute, visible = true 
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const IconRight = iconRight ? icons[iconRight] : null;
  const containerStyle = absolute ? styles.absoluteContainer : '';
  let messageStyle = '';

  switch (type) {
    case 'success':
      messageStyle = styles.successMessage;
      break;
    case 'error':
      messageStyle = styles.errorMessage;
      break;
    case 'info':
      messageStyle = styles.infoMessage;
      break;
    case 'default':
      messageStyle = styles.defaultMessage;
      break;
    default:
      messageStyle = styles.defaultMessage;
      break;
  }

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsVisible(false);
  };

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [timeout]);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div className={`${messageStyle} ${containerStyle}`}>
      {message}
      {IconRight && <IconRight onClick={handleClose} className={styles.icon} />}
      {timeout && (
        <div 
          className={styles.timeoutBar} 
          style={{ animationDuration: `${timeout}ms` }}
        ></div>
      )}
    </div>
  );
};

export default NotificationMessage;