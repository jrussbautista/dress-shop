import { ThemeProvider } from 'next-themes';
import React from 'react';

import { ToastProvider } from './toast';

export const AppProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
};
