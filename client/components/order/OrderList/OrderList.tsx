import React from 'react';
import Link from 'next/link';
import { formatDate, formatPrice } from 'utils/helpers';
import { Order } from 'types';
import styles from './OrderList.module.css';

interface Props {
  orders: Order[];
}

const OrderList: React.FC<Props> = ({ orders }) => {
  return (
    <div>
      {orders.length > 0 ? (
        <ul className={styles.ordersContainer}>
          {orders.map((order) => (
            <li key={order._id} className={styles.list}>
              <div>
                <div className={styles.date}>
                  Date Ordered:
                  <span className={styles.dateText}>{formatDate(order.createdAt)}</span>
                </div>
                <div className="products">
                  {order.products.map((product) => (
                    <div key={product.product._id} className={styles.productList}>
                      <div className={styles.productWrapper}>
                        <Link href={`/product?id=${product.product._id}`}>
                          <a>
                            <div className={styles.imageWrapper}>
                              <img
                                src={product.product.imageURL}
                                alt={product.product.name}
                                className={styles.productImage}
                              />
                            </div>
                          </a>
                        </Link>

                        <div className={styles.productInfo}>
                          <div>
                            <Link href={`/product?id=${product.product._id}`}>
                              <a>
                                <div className={styles.productName}>{product.product.name}</div>
                              </a>
                            </Link>
                            <div className={styles.productQuantity}>x {product.quantity}</div>
                          </div>
                          <div className={styles.productPrice}>
                            {formatPrice(product.product.price * product.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.orderBottom}>
                  <span className={styles.totalText}>Order Total:</span>
                  <span className={styles.totalPrice}>{formatPrice(order.total)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.msg}> You have no orders yet.</div>
      )}
    </div>
  );
};

export default OrderList;
