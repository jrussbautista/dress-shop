import React from 'react';
import { formatPrice } from 'utils/helpers';
import styles from './CartSubTotal.module.css';

interface Props {
  total: number;
}

const CartSubTotal: React.FC<Props> = ({ total }) => {
  return (
    <div className={styles.subtotal}>
      <div className={styles.label}> Sub Total </div>
      <div className={styles.price}> {formatPrice(total)} </div>
    </div>
  );
};

export default CartSubTotal;
