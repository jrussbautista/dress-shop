import React, { createContext, useContext, useState } from 'react';

import { Toast } from '@/components/ui';

interface Context {
  isActive: boolean;
  type: string;
  message: string;
  setToast(type: string, message: string): void;
  removeToast(): void;
}

export const ToastContext = createContext<Context | undefined>(undefined);
ToastContext.displayName = 'ToastContext';

export const ToastProvider: React.FC = ({ children }) => {
  const initialState = {
    isActive: false,
    type: '',
    message: '',
    setToast: () => null,
    removeToast: () => null,
  };

  const [state, setState] = useState(initialState);

  const removeToast = () => {
    setState({ ...state, isActive: false });
  };

  const setToast = (type: string, message: string) => {
    setState({ ...state, message, type, isActive: true });
    setTimeout(() => {
      removeToast();
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ ...state, setToast, removeToast }}>
      <Toast
        type={state.type}
        message={state.message}
        closeToast={removeToast}
        isActive={state.isActive}
      />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
