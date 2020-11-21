import React from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useToast } from 'contexts';
import styles from './Toast.module.css';

const Toast: React.FC = () => {
  const { type, message, isActive, removeToast } = useToast();

  return (
    <>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: isActive ? 0 : -60, opacity: isActive ? 1 : 0 }}
        style={{
          position: 'fixed',
          top: isActive ? '9rem' : 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          width: '100%',
          padding: '1rem',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div className={`${styles.alert} ${styles[type]}`} role={type}>
          <div>{message}</div>
          <button className={styles.close} onClick={removeToast}>
            <IoMdClose />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Toast;
