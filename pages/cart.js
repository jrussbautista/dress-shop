import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../store/auth/auth.context";
import { useCart } from "../store/cart/cart.context";
import CartList from "../components/Cart/CartList";
import CartSubTotal from "../components/Cart/CartSubTotal";
import calculateCartTotal from "../utils/calculateCartTotal";

const Cart = () => {
  const { currentUser } = useAuth();
  const { carts, removeCart } = useCart();

  return (
    <Layout>
      <div className="container">
        {currentUser ? (
          <div>
            <h1 className="page-title">Your Cart</h1>
            {carts.length > 0 ? (
              <>
                <CartList carts={carts} removeCart={removeCart} />
                <CartSubTotal total={calculateCartTotal(carts)} />
                <div className="checkout-btn-wrapper">
                  <button className="checkout-btn"> CHECK OUT</button>
                </div>
              </>
            ) : (
              <>
                <div> Your cart is empty :( </div>
                <button> Back to home </button>
              </>
            )}
          </div>
        ) : (
          <div>
            <h1 className="page-title"> Please login to see your cart </h1>
            <button> Login </button>
          </div>
        )}
      </div>
      <style jsx>
        {`
          .container {
            max-width: 1200px;
            margin: 2rem auto;
          }

          .page-title {
            font-size: 3rem;
          }

          .checkout-btn-wrapper {
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }

          .checkout-btn {
            width: 20rem;
            color: #fff;
            background-color: var(--color-dark);
            border: 1px solid var(--color-dark);
            padding: 1.5rem 0;
            display: block;
            font-size: 1.8rem;
            cursor: pointer;
          }
        `}
      </style>
    </Layout>
  );
};

export default Cart;
