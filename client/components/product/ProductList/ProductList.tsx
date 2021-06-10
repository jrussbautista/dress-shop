import Link from 'next/link';
import { Products } from 'types';
import Image from 'next/image';
import styles from './ProductList.module.css';

interface Props {
  products: Products;
}

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <Link href={`/products/${product._id}`} key={product._id}>
            <a>
              <div>
                <div className={styles.productImgWrapper}>
                  <Image
                    src={product.imageURL}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.productName}>{product.name}</div>
                  <div className={styles.productPrice}>P{product.price}</div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
