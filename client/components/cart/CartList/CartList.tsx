import React from 'react';
import CartItem from '../CartItem';
import { useCart } from 'contexts';
import styles from './CartList.module.css';

const CartList: React.FC = () => {
  const { carts } = useCart();

  return (
    <div>
      <>
        <div className={styles.cartHeader}>
          <div className={styles.cartHeaderProduct}> Product </div>
          <div className={styles.cartHeaderLbl}> Price</div>
          <div className={styles.cartHeaderLbl}> Quantity</div>
          <div className={styles.cartHeaderLbl}> Total</div>
          <div className={styles.cartHeaderLbl} style={{ textAlign: 'right' }}>
            Action
          </div>
        </div>
        {carts.map((cart) => (
          <CartItem cart={cart} key={cart._id} />
        ))}
      </>
    </div>
  );
};

export default CartList;
