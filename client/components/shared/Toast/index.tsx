import React from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useToast } from 'store';

export const Toast: React.FC = () => {
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
        <div className={`alert ${type}`} role={type}>
          <div>{message}</div>
          <button className="close" onClick={removeToast}>
            <IoMdClose />
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .alert {
          border-radius: 6px;
          padding: 2rem 1.5rem;
          font-size: 1.7rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: flex;
          justify-content: space-between;
        }
        .success {
          background-color: var(--color-success);
          color: #fff;
        }
        .error {
          background-color: var(--color-danger);
          color: var(--color-danger-light);
        }

        .close {
          padding: 0 1rem;
          cursor: pointer;
          font-size: 2rem;
          display: flex;
          align-items: center;
          background-color: transparent;
          border: 1px solid transparent;
          color: #fff;
        }
      `}</style>
    </>
  );
};
