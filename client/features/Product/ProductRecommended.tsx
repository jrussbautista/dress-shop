import React from 'react';
import { ProductList } from '../../shared';
import { Product } from '../../types';

interface Props {
  products: Product[];
}

export const ProductRecommended: React.FC<Props> = ({ products }) => {
  return (
    <div className="container">
      <div className="page-title">Related Products</div>
      <ProductList products={products} />
      <style jsx>{`
        .container {
          padding: 3rem 1.5rem;
        }
        .page-title {
          font-size: 3rem;
          font-weight: 600;
          padding: 2rem 0;
        }
      `}</style>
    </div>
  );
};
