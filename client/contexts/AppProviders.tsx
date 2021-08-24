import { ThemeProvider } from 'next-themes';
import React from 'react';
import { SWRConfig } from 'swr';

import { ToastProvider } from './toast';

export const AppProviders: React.FC = ({ children }) => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false, dedupingInterval: 0 }}>
      <ThemeProvider>
        <ToastProvider>{children}</ToastProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};
