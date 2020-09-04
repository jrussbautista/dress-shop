import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

interface InitialStateType {
  show: boolean;
  openModal(modal: any): void;
  closeModal(): void;
}

const initialState = {
  show: false,
  openModal: () => null,
  closeModal: () => null,
};

const ModalContext = createContext<InitialStateType>(initialState);

export const ModalProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);

  function closeModal() {
    setShow(false);
    setModal(null);
  }

  function openModal(modalComponent: any) {
    setShow(true);
    setModal(modalComponent);
  }

  return (
    <ModalContext.Provider value={{ show, closeModal, openModal }}>
      {children}
      {modal && ReactDOM.createPortal(modal, document.body)}
    </ModalContext.Provider>
  );
};

export const useModal = (): InitialStateType => useContext(ModalContext);
