import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Spinner, ErrorMessage } from '@/components/ui';
import useOrders from '@/hooks/orders/use-orders';
import formatPrice from '@/utils/formatPrice';
import { formatDate } from '@/utils/helpers';

import styles from './OrderList.module.css';

const OrderList = () => {
  const { data, isLoading, error } = useOrders();

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const orders = data || [];

  if (isLoading) {
    return <Spinner size={40} />;
  }

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
                  {orders.map((order) => (
                    <>
                      {order.items.map((product) => (
                        <div key={product.product._id} className={styles.productList}>
                          <div className={styles.productWrapper}>
                            <Link href={`/product?id=${product.product._id}`}>
                              <a>
                                <Image
                                  src={product.product.imageURL}
                                  alt={product.product.name}
                                  width={150}
                                  height={150}
                                />
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
                    </>
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
