import { ThemeProvider } from 'next-themes';
import React from 'react';

import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { ShopProvider } from './shop';
import { ToastProvider } from './toast';
import { WishlistProvider } from './wishlist';

export const AppProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <ShopProvider>
            <CartProvider>
              <WishlistProvider>{children}</WishlistProvider>
            </CartProvider>
          </ShopProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};
