import React from 'react';
import { CartItem } from './CartItem';
import { useCart } from 'store';

export const CartList: React.FC = () => {
  const { carts } = useCart();

  return (
    <div>
      <>
        <div className="cart-header">
          <div className="cart-header-product"> Product </div>
          <div className="cart-header-lbl"> Price</div>
          <div className="cart-header-lbl"> Quantity</div>
          <div className="cart-header-lbl"> Total</div>
          <div className="cart-header-lbl" style={{ textAlign: 'right' }}>
            Action
          </div>
        </div>
        {carts.map((cart) => (
          <CartItem cart={cart} key={cart._id} />
        ))}
      </>
      <style jsx>
        {`
          .cart-header {
            display: none;
            font-size: 2rem;
            border-bottom: 1px solid #e8e8e1;
            padding: 2rem 0;
            margin-bottom: 3rem;
          }

          .cart-header-product {
            width: 32rem;
            text-align: left;
          }

          .cart-header-lbl {
            flex: 1;
            text-align: center;
          }

          @media only screen and (min-width: 1024px) {
            .cart-header {
              display: flex;
            }
          }
        `}
      </style>
    </div>
  );
};
