import React, { createContext, useContext, useState } from 'react';
import Modal from './Modal';
import styles from './Modal.module.css';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openModalWithContent: (content: React.ReactNode) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
    children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);  // очищаем контент после закрытия
  };

  const openModalWithContent = (content: React.ReactNode) => {
    openModal();
    setModalContent(content);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, openModalWithContent }}>
        {children}
        <AnimatePresence>
          {isModalOpen && 
            <motion.div
            initial={{ opacity: 0 }} // Начальное состояние (невидимо и наверху)
            animate={{ opacity: 1 }} // Анимация появления (опускается вниз)
            exit={{ opacity: 0 }} // Анимация исчезновения (поднимается вверх)
            className={styles.overlay}
            onClick={closeModal}
          >
            <Modal key={Date.now()} onClose={closeModal}>{modalContent}</Modal>
          </motion.div>}
        </AnimatePresence>
    </ModalContext.Provider>
  );
};