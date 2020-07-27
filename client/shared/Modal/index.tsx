import { IoMdClose } from 'react-icons/io';
import { useModal } from '../../store';

interface Props {
  title: string;
}

export const Modal: React.FC<Props> = ({ children, title }) => {
  const { closeModal } = useModal();

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <div className="close" onClick={closeModal}>
            <IoMdClose size={32} />
          </div>
        </div>
        <div className="modal-content">{children}</div>
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


          `}
      </style>
    </div>
  );
};
