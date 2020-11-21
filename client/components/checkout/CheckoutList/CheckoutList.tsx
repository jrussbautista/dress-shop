import React from 'react';
import { Cart } from 'types';
import { formatPrice } from 'utils/helpers';
import styles from './CheckoutList.module.css';

interface Props {
  items: Cart[];
}

const CheckoutList: React.FC<Props> = ({ items }) => {
  return (
    <>
      <div>
        {items.map((item) => (
          <div key={item._id} className={styles.itemContainer}>
            <div className={styles.info}>
              <div className={styles.main}>
                <img className={styles.image} src={item.product.imageURL} alt={item.product.name} />
                <div>{item.product.name}</div>
              </div>
              <div className={styles.content}>
                <div className={styles.qty}>x {item.quantity}</div>
              </div>
              <div className={styles.content}>
                <div className={styles.price}>{formatPrice(item.product.price)}</div>
              </div>
              <div className={styles.content} style={{ textAlign: 'right' }}>
                <div className={styles.orderTotal}>
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckoutList;
