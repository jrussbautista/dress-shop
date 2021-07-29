import { Products } from 'types';

import ProductCard from '../ProductCard';

import styles from './ProductList.module.css';

interface Props {
  products: Products;
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
