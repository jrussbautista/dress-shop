import React from 'react';
import ProductList from '../Shared/Products/ProductList';

const Recommended = ({ products }) => {
  return (
    <div className="container">
      <div className="page-title">Related Products</div>
      <ProductList products={products} />
      <style jsx>{`
        .container {
          padding: 3rem 0;
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

export default Recommended;
