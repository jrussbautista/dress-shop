import React from 'react';
import { GetServerSideProps } from 'next';
import { OrderList } from '../features/Order';
import { Meta } from '../shared';
import { Order as OrderType } from '../types';
import { OrderService } from '../services/orderService';
import { parseCookies } from 'nookies';
import { ErrorPage } from '../shared';

type Orders = OrderType[];

interface Props {
  orders: Orders;
  error: string;
}

const Order: React.FC<Props> = ({ orders, error }) => {
  if (error) {
    return <ErrorPage message={error} />;
  }

  return (
    <>
      <Meta title="My Orders" />
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        <OrderList orders={orders} />
      </div>
      <style jsx>{`
        .container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }
        .page-title {
          font-size: 3rem;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      props: {
        error: false,
        carts: [],
      },
    };
  }

  let orders: Orders = [];
  const error: null | string = null;
  try {
    const result = await OrderService.fetchOrders(token);
    orders = result.orders;
  } catch (error) {
    return {
      props: {
        error: 'Error in getting your order. Please try again',
        orders: [],
      },
    };
  }

  return {
    props: { orders, error },
  };
};

export default Order;
