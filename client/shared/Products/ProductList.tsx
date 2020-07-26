import Link from 'next/link';
import React from 'react';
import { Products } from '../../types';

interface Props {
  products: Products;
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className="product-grid">
        {products.map((product) => (
          <Link href={`/product?id=${product._id}`} key={product._id}>
            <a>
              <div>
                <div className="product-img-cover">
                  <img className="product-img" src={product.imageURL} alt="" />
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">P{product.price}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <style jsx>
        {`
          .product-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1.5rem;
          }

          .product-img-cover {
            position: relative;
            padding-top: 100%;
            background-color: var(--color-gray);
          }

          .product-img {
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            object-fit: cover;
          }

          .product-info {
            padding: 1rem;
          }

          .product-name {
            font-size: 1.7rem;
            color: var(--color-dark);
          }

          .product-price {
            color: var(--color-primary);
            font-size: 1.8rem;
            font-weight: 600;
          }

          @media only screen and (min-width: 768px) {
            .product-grid {
              grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
            }
          }
        `}
      </style>
    </>
  );
};
