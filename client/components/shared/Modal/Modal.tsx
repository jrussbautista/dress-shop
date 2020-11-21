import React from 'react';
import ReactDOM from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { useModal } from 'contexts';
import styles from './Modal.module.css';

interface Props {
  title: string;
}

const Modal: React.FC<Props> = ({ children, title }) => {
  const { closeModal, isOpen } = useModal();

  return (
    <>
      {isOpen &&
        ReactDOM.createPortal(
          <div className={styles.modal}>
            <div className={styles.modalBody}>
              <div className={styles.modalHeader}>
                <div className={styles.modalTitle}>{title}</div>
                <button type="button" className={styles.close} onClick={closeModal}>
                  <IoMdClose size={32} />
                </button>
              </div>
              <div className={styles.modalContent}>{children}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
