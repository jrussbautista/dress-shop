import { IoMdClose } from 'react-icons/io';
import Spinner from '../Loader/Spinner';
import { useState } from 'react';

const Modal = ({ children, close, title, onSubmit, hasFooter }) => {
  const [submit, setSubmit] = useState(false);

  async function handleSubmit() {
    setSubmit(true);
    await onSubmit();
    setSubmit(false);
    close();
  }

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <div className="close" onClick={close}>
            <IoMdClose size={32} />
          </div>
        </div>
        <div className="modal-content">{children}</div>
        {hasFooter && (
          <div className="modal-footer">
            <button className="btn btn-cancel" onClick={close}>
              CANCEL
            </button>
            <button className="btn btn-ok" onClick={handleSubmit}>
              {submit ? <Spinner color="#fff" width={40} height={20} /> : 'OK'}
            </button>
          </div>
        )}
      </div>
      <style jsx>
        {`
            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              z-index: 99;
              background: rgba(0, 0, 0, 0.5);
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .modal-body {
              max-width: 80%;
              background-color: #fff;
              padding: 1.5rem;
              border-radius: 6px;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
            }

            .modal-title {
              font-size: 2.5rem;
              font-weight: 600;
              text-align: center;
            }

            .close {
              font-size: 1.5rem;
              cursor: pointer;
              padding
            }

            .modal-content {
              font-size: 1.6rem;
              padding: 1rem 0;
            }

            .modal-footer {
              padding: 1rem 0;
              display: flex;
              justify-content: flex-end;
            }

            .btn {
              display: inline-flex;
              align-items: center;
              text-align: center;
              font-size: 2rem;
              padding: 0 3rem;
              height: 5rem;
              border-radius: 6px;
              border: 1px solid transparent;
              cursor: pointer;
            }

            .btn-ok {
              background-color: var(--color-primary);
              color: #fff;
            }

            .btn-cancel {
              background-color: #fff;
              color: var(--color-primary);
              border: 1px solid var(--color-primary);
              margin-right: 1rem;
            }
          `}
      </style>
    </div>
  );
};

export default Modal;
