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
    (kids: React.ReactNode, parent: any) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );

const StoreProvider: React.FC<InitialStateProps> = ({
  children,
  currentUser,
}) => {
  return (
    <ProviderComposer
      contexts={[
        <AuthProvider currentUser={currentUser} />,
        <CartProvider />,
        <ModalProvider />,
        <ShopProvider />,
        <ToastProvider />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

export { StoreProvider };
