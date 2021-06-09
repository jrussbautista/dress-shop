import React from 'react';
import { AuthProvider } from './auth';
import { CartProvider } from './cart';
import { ShopProvider } from './shop';
import { ToastProvider } from './toast';
import { User } from '../types';

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

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <ProviderComposer
      contexts={[
        <ToastProvider key="1" />,
        <AuthProvider key="2" />,
        <CartProvider key="3" />,
        <ShopProvider key="4" />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};
