import React from 'react';
import ReactDOM from 'react-dom';
import { FaCheck } from 'react-icons/fa';
import styles from './PopUp.module.css';

interface Props {
  message: string;
  isOpen: boolean;
}

const PopUp: React.FC<Props> = ({ message, isOpen }) =>
  isOpen
    ? ReactDOM.createPortal(
        <div className={styles.popupContainer}>
          <div className={styles.message}> {message}</div>
          <FaCheck color={'#59981A'} size={64} />
        </div>,
        document.body
      )
    : null;

export default PopUp;
