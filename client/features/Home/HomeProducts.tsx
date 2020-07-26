import React, { useEffect } from 'react';
import { ProductList, ProductsSkeleton } from '../../shared';
import { useShop } from '../../store';

export const HomeProducts: React.FC = () => {
  const { isLoading, products, loadProducts } = useShop();

  useEffect(() => {
    // load products if empty
    products.length === 0 && loadProducts();
  }, []);

  const homeProducts = isLoading ? (
    <ProductsSkeleton number={20} />
  ) : (
    <ProductList products={products} />
  );

  return (
    <>
      <div className="container">{homeProducts}</div>

      <style jsx>{`
        .container {
          padding: 0 1.5rem;
        }
      `}</style>
    </>
  );
};
