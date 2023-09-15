import React, { createContext, useContext, useState } from 'react';
import Modal from './Modal';

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
        {isModalOpen && <Modal onClose={closeModal}>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};