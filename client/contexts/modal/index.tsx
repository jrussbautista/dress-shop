import React, { createContext, useState, useContext } from 'react';

interface InitialStateType {
  isOpen: boolean;
  openModal(): void;
  closeModal(): void;
}

const initialState = {
  isOpen: false,
  openModal: () => null,
  closeModal: () => null,
};

const ModalContext = createContext<InitialStateType>(initialState);

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <ModalContext.Provider value={{ isOpen, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): InitialStateType => useContext(ModalContext);
