import React from 'react';
import { Product } from '../../types';

interface Props {
  product: Product;
}

export const ProductInfo: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className="product-wrapper">
        <div className="product-name">{product.name}</div>
        <div className="product-price">P{product.price}</div>
        <div className="product-desc">{product.description}</div>
      </div>
      <style jsx>{`
        .product-name {
          font-size: 3rem;
          font-weight: 600;
        }

        .product-wrapper {
          padding: 0 1.5rem;
        }

        .product-price {
          margin-top: 2rem;
          font-size: 2rem;
          font-weight: 600;
          color: var(--color-primary);
        }

        .product-desc {
          font-size: 1.7rem;
          margin-top: 2rem;
          color: #666;
        }
      `}</style>
    </>
  );
};
