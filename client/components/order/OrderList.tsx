import React from 'react';
import Link from 'next/link';
import { formatDate, formatPrice } from 'utils/helpers';
import { Order } from 'types';

interface Props {
  orders: Order[];
}

export const OrderList: React.FC<Props> = ({ orders }) => {
  return (
    <div>
      {orders.length > 0 ? (
        <ul className="orders-container">
          {orders.map((order) => (
            <li key={order._id} className="list">
              <div>
                <div className="date">
                  Date Ordered:
                  <span className="date-text">{formatDate(order.createdAt)}</span>
                </div>
                <div className="products">
                  {order.products.map((product) => (
                    <div key={product.product._id} className="product-list">
                      <div className="product-wrapper">
                        <Link href={`/product?id=${product.product._id}`}>
                          <a>
                            <div className="image-wrapper">
                              <img
                                src={product.product.imageURL}
                                alt={product.product.name}
                                className="product-image"
                              />
                            </div>
                          </a>
                        </Link>

                        <div className="product-info">
                          <div>
                            <Link href={`/product?id=${product.product._id}`}>
                              <a>
                                <div className="product-name">{product.product.name}</div>
                              </a>
                            </Link>
                            <div className="product-quantity">x {product.quantity}</div>
                          </div>
                          <div className="product-price">
                            {formatPrice(product.product.price * product.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-bottom">
                  <span className="total-text">Order Total:</span>
                  <span className="total-price">{formatPrice(order.total)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="msg"> You have no orders yet.</div>
      )}

      <style jsx>{`
        .orders-container {
          padding: 1rem;
        }

        .list {
          margin-top: 2rem;
          border-bottom: 1px solid #d5d5d5;
        }

        .product-wrapper {
          display: flex;
        }

        .date {
          font-size: 1.7rem;
        }

        .date-text {
          color: gray;
          padding: 0 0.5rem;
        }

        .product-info {
          flex: 1;
          padding: 0 2rem;
          font-size: 1.6rem;
          display: flex;
          justify-content: space-between;
        }

        .product-name {
          font-size: 1.8rem;
          color: var(--color-dark);
        }

        .product-price {
          font-size: 1.8rem;
          color: var(--color-primary);
        }

        .product-list {
          margin-top: 2rem;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .image-wrapper {
          width: 15rem;
          height: 15rem;
        }

        .total-text {
          font-size: 2rem;
          padding-right: 1rem;
        }

        .total-price {
          color: var(--color-primary);
          font-weight: 600;
          font-size: 3rem;
        }

        .order-bottom {
          padding: 2rem 2rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .msg {
          text-align: center;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
};
