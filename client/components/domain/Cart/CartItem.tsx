import React, { useState } from 'react';
import { formatPrice } from 'utils/helpers';
import Link from 'next/link';
import { Cart } from 'types';
import { useToast } from 'store';
import { InputQuantity } from 'components/shared';
import { CartService } from 'services';
import { parseCookies } from 'nookies';

interface Props {
  cart: Cart;
  removeCart(cartId: string, productId: string): void;
  updateQty(cartId: string, qty: number): void;
}

export const CartItem: React.FC<Props> = ({ cart, removeCart, updateQty }) => {
  const { setToast } = useToast();

  const { token } = parseCookies({});

  const [qty, setQty] = useState<string | number>(cart.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const total = formatPrice(parseFloat((cart.product.price * cart.quantity).toFixed(2)));

  const handleRemoveCart = async () => {
    try {
      await CartService.removeCart(token, cart._id);
      removeCart(cart._id, cart.product._id);
    } catch (error) {
      setToast('error', error.message);
    }
  };

  const updateQtyAsync = async (quantity: number) => {
    try {
      setIsUpdating(true);
      await CartService.updateCart(token, cart._id, quantity);
      updateQty(cart._id, quantity);
      setQty(quantity);
    } catch (error) {
      setToast('error', error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChangeQty = (value: string | number) => {
    if (Number(value) > 10) {
      setToast('error', 'Ops up to 10 max only');
      setQty(10);
      return;
    }
    setQty(value);
  };

  const handleBtnChangeQty = (action: string) => {
    if (qty >= 10) {
      setToast('error', 'Ops you can add to cart up to 10 max only');
      return;
    }

    if (action === 'add') {
      const quantity = Number(qty) + 1;
      updateQtyAsync(quantity);
      return;
    }

    if (qty > 1) {
      const quantity = Number(qty) - 1;
      updateQtyAsync(quantity);
    }
  };

  const handleChangeBlur = (val: string) => {
    if (!val) {
      updateQtyAsync(cart.quantity);
      return;
    }

    updateQtyAsync(Number(qty));
  };

  return (
    <div className="product-list">
      <div className="product">
        <div className="product-img">
          <Link href={`/product?id=${cart.product._id}`}>
            <a>
              <img src={cart.product.imageURL} alt={cart.product.name} />
            </a>
          </Link>
        </div>

        <div className="product-info">
          <div className="product-name">
            <Link href={`/product?id=${cart.product._id}`}>
              <a>{cart.product.name}</a>
            </Link>
          </div>

          <div className="product-price product-content">{formatPrice(cart.product.price)}</div>
          <div className="product-qty product-content">
            <div className="qty-container">
              <InputQuantity
                isUpdating={isUpdating}
                value={qty}
                onButtonClick={handleBtnChangeQty}
                onChangeInput={handleInputChangeQty}
                onChangeBlur={handleChangeBlur}
              />
            </div>
          </div>
          <div className="total product-content">{total}</div>
          <div className="product-action">
            <button className="btn-cart-action" onClick={handleRemoveCart}>
              Delete
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
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
          padding: 0 2rem;
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
          object-fit: cover;
        }

        .product-price {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .product-qty {
          font-size: 2rem;
        }

        .product-action {
          display: flex;
          flex: 1;
          align-items: flex-start;
        }

        .btn-cart-action {
          background-color: transparent;
          border: 1px solid transparent;
          font-size: 1.6rem;
          color: var(--color-primary);
          cursor: pointer;
        }

        .qty-container {
          margin-bottom: 1rem;
        }

        .total {
          font-size: 2rem;
          color: var(--color-primary);
        }

        @media only screen and (min-width: 1024px) {
          .product-info {
            display: flex;
            padding: 0 1rem;
          }

          .product-info .product-content {
            justify-content: center;
          }

          .product-action {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};
