import React from 'react';
import styles from './Modal.module.css';
import icons from '../../assets/icons/icons';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // event.stopPropagation();
        // event.preventDefault();
    };
  
    return (
      <div className={styles.overlay} onClick={handleModalClick}>
        <div className={styles.modal}>
          <icons.close className={styles.closeButton} onClick={onClose} />
          {children}
        </div>
      </div>
    );
  };
  

export default Modal;
