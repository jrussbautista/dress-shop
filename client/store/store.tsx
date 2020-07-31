import React from 'react';
import { AuthProvider } from './auth/authContext';
import { CartProvider } from './cart/cartContext';
import { ModalProvider } from './modal/modalContext';
import { ShopProvider } from './shop/shopContext';
import { ToastProvider } from './toast/toastContext';
import { User } from '../types';

type InitialStateProps = {
  currentUser: User | null;
};

type ProviderProps = {
  contexts: any;
};

const ProviderComposer: React.FC<ProviderProps> = ({ contexts, children }) =>
  contexts.reduceRight(
    (
      kids: React.ReactNode,
      parent: React.DetailedReactHTMLElement<{ children: React.ReactNode }, HTMLElement>
    ) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );

export const StoreProvider: React.FC<InitialStateProps> = ({ children, currentUser }) => {
  return (
    <ProviderComposer
      contexts={[
        <AuthProvider currentUser={currentUser} key="1" />,
        <CartProvider key="2" />,
        <ModalProvider key="3" />,
        <ShopProvider key="4" />,
        <ToastProvider key="5" />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};
