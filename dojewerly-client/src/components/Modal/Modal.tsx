import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import icons from '../../assets/icons/icons';
import { motion } from 'framer-motion';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {  

  const handleClose = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    onClose();
  };

  return (
      <motion.div
        initial={{ opacity: 0, y: 50 }} // Начальное состояние (невидимо и наверху)
        animate={{ opacity: 1, y: 0 }} // Анимация появления (опускается вниз)
        exit={{ opacity: 0, y: 50 }} // Анимация исчезновения (поднимается вверх)
        className={styles.modal}
        onClick={(e) => {e.stopPropagation()}}
      >
        <icons.close className={styles.closeButton} onClick={(e) => handleClose(e)} />
        {children}
      </motion.div>
  );
};

export default React.memo(Modal);
