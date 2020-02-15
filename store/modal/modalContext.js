import React, { createContext, useState, useContext, useMemo } from 'react';
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

  const value = useMemo(() => ({ show, openModal, closeModal }), []);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && ReactDOM.createPortal(modal, document.body)}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalProvider, useModal };
