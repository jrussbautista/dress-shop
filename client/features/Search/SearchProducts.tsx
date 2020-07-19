import React from 'react';
import { Product } from '../../types';
import { ProductList } from '../../shared';

interface Props {
  products: Product[];
}

export const SearchProducts: React.FC<Props> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div>
        <div className="message">
          No products found. Try searching for other keyword.
        </div>
        <style jsx>{`
          .message {
            padding: 1rem;
            text-align: center;
            font-size: 2rem;
          }
        `}</style>
      </div>
    );
  }

  return <ProductList products={products} />;
};
