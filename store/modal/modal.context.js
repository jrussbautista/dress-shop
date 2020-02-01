import React, { createContext, useState, useContext } from 'react';
import ReactDOM from 'react-dom';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(null);
  function closeModal() {
    setShow(false);
    setModal(null);
  }

  function openModal(modalComponent) {
    setShow(true);
    setModal(modalComponent);
  }

  return (
    <ModalContext.Provider value={{ show, openModal, closeModal }}>
      {children}
      {modal && ReactDOM.createPortal(modal, document.body)}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
