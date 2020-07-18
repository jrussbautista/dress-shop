import Link from 'next/link';
import { Cart } from '../../types';

interface Props {
  carts: Cart[];
  removeCart(cartId: string, productId: string): void;
}

export const CartList: React.FC<Props> = ({ carts, removeCart }) => {
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
          <div key={cart.product._id} className="product-list">
            <div className="product">
              <div className="product-img">
                <Link href={`/product?id=${cart.product._id}`}>
                  <a>
                    <img src={cart.product.imageURL} alt="" />
                  </a>
                </Link>
              </div>

              <div className="product-info">
                <div className="product-name">
                  <Link href={`/product?id=${cart.product._id}`}>
                    <a>{cart.product.name}</a>
                  </Link>
                </div>

                <div className="product-price product-content">
                  P{cart.product.price}
                </div>
                <div className="product-qty product-content">
                  x {cart.quantity}{' '}
                </div>
                <div className="total product-content">
                  P{parseFloat((cart.product.price * cart.quantity).toFixed(2))}
                </div>
                <div
                  className="product-content"
                  style={{ justifyContent: 'flex-end' }}
                >
                  {' '}
                  <button
                    className="btn-remove"
                    onClick={() => removeCart(cart._id, cart.product._id)}
                  >
                    {' '}
                    Remove{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
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

          .product-list {
            display: flex;
            margin-top: 2rem;
          }

          .product {
            display: flex;
            width: 100%;
          }

          .product-info {
            flex: 1;
          }

          .product-content {
            flex: 1;
            display: flex;
          }

          .product-info {
            padding: 0 1rem;
          }

          .product-name {
            font-size: 1.7rem;
            font-weight: 600;
            width: 20rem;
          }

          .product-img {
            width: 12rem;
            height: 12rem;
            overflow: hidden;
          }

          .product-img img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .product-price {
            color: var(--color-primary);
            font-size: 2rem;
          }

          .product-qty {
            font-size: 2rem;
          }

          .total {
            font-size: 2rem;
          }

          .btn-remove {
            color: #fff;
            background-color: var(--color-dark);
            border: 1px solid var(--color-dark);
            padding: 0 2rem;
            display: block;
            font-size: 1.5rem;
            cursor: pointer;
            height: 4.5rem;
          }

          @media only screen and (min-width: 768px) {
            .product-info {
              display: flex;
            }

            .product-info div {
              justify-content: center;
              padding: 1rem 0;
            }

            .cart-header {
              display: flex;
            }
          }
        `}
      </style>
    </div>
  );
};
