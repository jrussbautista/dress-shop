import React from 'react';
import ReactDOM from 'react-dom';
import { FaCheck } from 'react-icons/fa';

interface Props {
  message: string;
  isOpen: boolean;
}

export const PopUp: React.FC<Props> = ({ message, isOpen }) =>
  isOpen
    ? ReactDOM.createPortal(
        <div className="popup-container">
          <div className="message"> {message}</div>
          <FaCheck color={'#59981A'} size={64} />
          <style jsx>{`
            .popup-container {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              height: 30rem;
              width: 30rem;
              background: rgba(0, 0, 0, 0.8);
              z-index: 10;
              border-radius: 15px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }

            .message {
              color: #fff;
              font-size: 2rem;
              font-weight: 600;
              padding: 1rem;
              text-align: center;
            }
          `}</style>
        </div>,
        document.body
      )
    : null;
