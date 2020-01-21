import React from 'react';
import ProductList from '../Shared/Products/ProductList';
import PropTypes from 'prop-types';

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

Recommended.propTypes = {
  products: PropTypes.array.isRequired
};

export default Recommended;
